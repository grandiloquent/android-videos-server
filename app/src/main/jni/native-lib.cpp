#include <jni.h>
#include <android/log.h>
#include "httplib.h"
#include <filesystem>
#include <string>
#include <dirent.h>
#include <android/asset_manager.h>
#include <android/asset_manager_jni.h>
#include "Utils.h"
#include "ArduinoJson/ArduinoJson.h"
#include "Converter.h"
#include <fstream>

using namespace httplib;

std::string SubstringAfterLast(const std::string &value,
                               const std::string &str) {
    auto index = value.find_last_of(str);
    if (index != std::string::npos)
        return value.substr(index + str.length());
    else
        return std::string();
}

static AAssetManager *manager = nullptr;

static std::map<std::string, std::string> mimetypes{
        {"css",   "text/css"},
        {"mpga",  "audio/mpeg"},
        {"csv",   "text/csv"},
        {"weba",  "audio/webm"},
        {"txt",   "text/plain"},
        {"wav",   "audio/wave"},
        {"vtt",   "text/vtt"},
        {"otf",   "font/otf"},
        {"html",  "text/html"},
        {"htm",   "text/html"},
        {"ttf",   "font/ttf"},
        {"apng",  "image/apng"},
        {"woff",  "font/woff"},
        {"avif",  "image/avif"},
        {"woff2", "font/woff2"},
        {"bmp",   "image/bmp"},
        {"7z",    "application/x-7z-compressed"},
        {"gif",   "image/gif"},
        {"atom",  "application/atom+xml"},
        {"png",   "image/png"},
        {"pdf",   "application/pdf"},
        {"svg",   "image/svg+xml"},
        {"mjs",   "application/javascript"},
        {"js",    "application/javascript"},
        {"webp",  "image/webp"},
        {"json",  "application/json"},
        {"ico",   "image/x-icon"},
        {"rss",   "application/rss+xml"},
        {"tif",   "image/tiff"},
        {"tar",   "application/x-tar"},
        {"tiff",  "image/tiff"},
        {"xhtml", "application/xhtml+xml"},
        {"xht",   "application/xhtml+xml"},
        {"jpeg",  "image/jpeg"},
        {"jpg",   "image/jpeg"},
        {"xslt",  "application/xslt+xml"},
        {"mp4",   "video/mp4"},
        {"xml",   "application/xml"},
        {"mpeg",  "video/mpeg"},
        {"gz",    "application/gzip"},
        {"webm",  "video/webm"},
        {"zip",   "application/zip"},
        {"mp3",   "audio/mp3"},
        {"wasm",  "application/wasm"},
};

bool IsDirectory(std::string &fileName, bool followLinks) {
    int status;
    struct stat statBuf;
    if (followLinks)
        status = stat(fileName.c_str(), &statBuf);
    else
        status = lstat(fileName.c_str(), &statBuf);
    status = (status == 0 && S_ISDIR(statBuf.st_mode));
    return status;
}

bool readBytesAsset(AAssetManager *aAssetManager, std::string_view filename, unsigned char **data,
                    unsigned int *len) {

    AAsset *aAsset = AAssetManager_open(aAssetManager, filename.data(), AASSET_MODE_BUFFER);
    if (aAsset == nullptr) {
        *data = nullptr;
        if (len) *len = 0;
        return false;
    }
    auto size = (unsigned int) AAsset_getLength(aAsset);
    *data = (unsigned char *) malloc(size);
    AAsset_read(aAsset, *data, size);
    if (len) *len = size;

    AAsset_close(aAsset);
    return true;
}

int timeStringToMs(const std::string &time) {
    // Time format: hh:mm:ss,### (where # = ms)
    int hours = stoi(time.substr(0, 2));
    int minutes = stoi(time.substr(3, 2));
    int seconds = stoi(time.substr(6, 2));
    int milliseconds = stoi(time.substr(9));

    return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
}


std::string msToVttTimeString(int ms) {
    int hours = ms / 3600000;
    ms -= hours * 3600000;

    int minutes = ms / 60000;
    ms -= minutes * 60000;

    int seconds = ms / 1000;
    ms -= seconds * 1000;

    return (hours < 10 ? "0" : "") + std::to_string(hours)
           + ":" + (minutes < 10 ? "0" : "") + std::to_string(minutes)
           + ":" + (seconds < 10 ? "0" : "") + std::to_string(seconds)
           + "." + (ms < 100 ? "0" : "") + (ms < 10 ? "0" : "") + std::to_string(ms);
}

std::string &str_replace(std::string &subject, std::string search, std::string replace) {
    for (;;) {
        size_t index = subject.find_first_of(search);
        if (index == std::string::npos) break;
        subject.replace(index, search.length(), replace);
    }

    return subject;
}

std::string convertFile(std::string filepath) {


    std::ifstream infile(filepath, std::ifstream::in);


    std::stringstream outfile;
//        if (!outfile.is_open()) {
//            throw ios_base::failure("Could not open .vtt file.");
//        }
//        outfile.imbue(locale(outfile.getloc(), new codecvt_utf8<wchar_t>));

    // Write mandatory starting for the WebVTT file
    outfile << "WEBVTT" << std::endl << std::endl;

    std::regex rgxDialogNumber("\\d+");
    std::regex rgxTimeFrame(R"((\d\d:\d\d:\d\d,\d{1,3}) --> (\d\d:\d\d:\d\d,\d{1,3}))");

    for (;;) {
        std::string sLine;

        if (!getline(infile, sLine)) break;

        //LOGE("%s", sLine.c_str());
        Utils::rtrim(sLine, '\r'); // Trim a possibly trailing CR character

        // Ignore dialog number lines
        if (regex_match(sLine, rgxDialogNumber))
            continue;

        std::smatch matchTimeFrame;
        regex_match(sLine, matchTimeFrame, rgxTimeFrame);

        if (!matchTimeFrame.empty()) {
            // Handle invalid SRT files where the time frame's milliseconds are less than 3 digits long
            bool msTooShort = matchTimeFrame[1].length() < 12 || matchTimeFrame[2].length() < 12;

            if (msTooShort) {
                // Extract the times in milliseconds from the time frame line
                int msStartTime = timeStringToMs(matchTimeFrame[1]);
                int msEndTime = timeStringToMs(matchTimeFrame[2]);

                // Modify the time with the offset, making sure the time
                // gets set to 0 if it is going to be negative
//                msStartTime += _timeOffsetMs;
//                msEndTime += _timeOffsetMs;
                if (msStartTime < 0) msStartTime = 0;
                if (msEndTime < 0) msEndTime = 0;

                // Construct the new time frame line
                sLine = msToVttTimeString(msStartTime) + " --> " + msToVttTimeString(msEndTime);
            } else {
                // Simply replace the commas in the time with a period
                sLine = str_replace(sLine, ",", ".");
            }
        }

        outfile << sLine << std::endl; // Output the line to the new file
    }
    return outfile.str();

}

extern "C"
JNIEXPORT void JNICALL
Java_euphoria_psycho_filemanager_MainActivity_startServer(JNIEnv *env, jclass clazz, jstring host) {
    auto host_ = host != nullptr ? env->GetStringUTFChars(host, nullptr) : "localhost";

    httplib::Server server;


    server.Get("/api/files", [](const Request &req, Response &res) {
        std::string path;
        if (req.has_param("path")) {
            path = req.get_param_value("path");
        }
        if (path.empty()) {
            path = "/storage/emulated/0";
        }
        if (!IsDirectory(path, false)) {
            auto extension = SubstringAfterLast(path, ".");
            auto type = mimetypes[extension];
            if (type.empty()) {
                type = "application/octet-stream";
            }

            if (extension == "vtt") {
                auto f = path.replace(path.find(".vtt"), 4, ".srt");
                if (std::filesystem::exists(f)) {
                    std::string w = convertFile(f);
                    res.set_header("Content-Length", std::to_string(w.size()));
                    res.set_content(w, type.c_str());
                } else {
                    res.status = 404;
                }
                return;
            }

            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Content-Disposition",
                           "attachment; filename=\"" + SubstringAfterLast(path, "/") + "\"");
            std::shared_ptr<std::ifstream> fs = std::make_shared<std::ifstream>();
            fs->open(path, std::ios_base::binary);
            fs->seekg(0, std::ios_base::end);
            auto end = fs->tellg();
            fs->seekg(0);
            if(end<=0){
                return;
            }
            std::map<std::string, std::string> file_extension_and_mimetype_map;
            res.set_content_provider(static_cast<size_t>(end),
                                     type.c_str(),
                                     [fs](uint64_t offset,
                                          uint64_t length,
                                          DataSink &sink) {
                                         if (fs->fail()) {
                                             return false;
                                         }

                                         fs->seekg(offset, std::ios_base::beg);

                                         size_t bufSize = 81920;
                                         char buffer[bufSize];

                                         fs->read(buffer, bufSize);

                                         sink.write(buffer,
                                                    static_cast<size_t>(fs->gcount()));
                                         return true;
                                     });
            return;
        }
        std::vector<std::filesystem::directory_entry> files;
        for (const auto &dir :std::filesystem::directory_iterator(path)) {
            files.push_back(dir);
        }
        if (files.empty()) {
            res.status = 404;
            return;
        }
        DynamicJsonDocument doc(1024 * 1024);
        JsonArray arr = doc.to<JsonArray>();

        std::sort(files.begin(), files.end(),
                  [](std::filesystem::directory_entry a, std::filesystem::directory_entry b) {
                      auto a1 = a.is_directory();
                      auto b1 = b.is_directory();
                      if (a1 && !b1) {
                          return true;
                      }
                      if (!a1 && b1) {
                          return false;
                      }
                      return a.path().filename() < b.path().filename();
                  });
        for (auto &file:files) {
            auto isDirectory = file.is_directory();
            JsonObject object = arr.createNestedObject();
            object["name"] = SubstringAfterLast(file.path(), "/");
            object["fullName"] = file.path().c_str();
            object["length"] = isDirectory ? 0 : file.file_size();
            object["isDirectory"] = isDirectory;
        }
        doc.shrinkToFit();
        std::string result;
        serializeJson(doc, result);

        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(result.c_str(), "application/json");

    });
    server.Get(R"(/(.*))", [&](const Request &req, Response &res) {
        auto fileName = req.matches[1].str();
        if (fileName.empty()) {
            fileName = "index.html";
        }
        unsigned char *data;
        unsigned int len = 0;
        readBytesAsset(manager, fileName, &data, &len);
        res.set_content(reinterpret_cast<const char *>(data), len,
                        mimetypes[SubstringAfterLast(fileName, ".")].c_str());
        free(data);
    });


    //  "192.168.0.109", 8000
    // host_, 8000
    server.listen(host_, 8001);
}
extern "C"
JNIEXPORT void JNICALL
Java_euphoria_psycho_filemanager_MainActivity_load(JNIEnv *env, jclass clazz,
                                                   jobject assetManager) {
    AAssetManager *mgr = AAssetManager_fromJava(env, assetManager);
    manager = mgr;
}