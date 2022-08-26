#ifndef UTILS_H
#define UTILS_H
// #include "utils.h"

#include "text_encoding_detect.h"
#include <fstream>
#include <string>
#include <fcntl.h>
#include <sys/stat.h>
#include <dirent.h>
#include <filesystem>
#include <jni.h>
#include <android/asset_manager.h>
#include <android/asset_manager_jni.h>
#include <vector>

#define LOGI(...) \
  ((void)__android_log_print(ANDROID_LOG_INFO, "B5aOx2::", __VA_ARGS__))
#define LOGE(...) \
  ((void)__android_log_print(ANDROID_LOG_ERROR, "B5aOx2::", __VA_ARGS__))




/*std::vector<std::string> ParseTemplate(std::string &string) {
    std::vector<std::string> blocks;
    int offset = 0;
    for (int i = 0; i < string.size(); ++i) {
        if (string[i] == '{' && string[i + 1] == '{') {
            blocks.push_back(string.substr(offset, i - offset));
            offset = i + 2;
            for (int j = i; j < string.size(); ++j) {
                if (string[j] == '}' && string[j + 1] == '}') {
                    blocks.push_back(string.substr(offset, j - offset));
                    offset = j + 2;
                    break;
                }
            }
        }
    }
    if (offset < string.size()) {
        blocks.push_back(string.substr(offset, string.size() - offset));
    }
    return blocks;
}


std::vector<std::filesystem::path> listWebFiles(std::string &path) {
    std::filesystem::path dir{path};
    if (!std::filesystem::is_directory(std::filesystem::status(dir)))
        return std::vector<std::filesystem::path>{};
    std::vector<std::filesystem::path> files{};
    for (auto const &dir_entry: std::filesystem::directory_iterator{dir}) {
        if (dir_entry.is_directory() ||
            (dir_entry.is_regular_file() )) {
            files.push_back(dir_entry.path());
        }
    }
    return files;
}

 */


struct File {
public:
    std::string path;
    long size;
    bool isDirectory;
};

class Utils
{
public:
    /**
     * Opens a file into a stream and formats the stream based on the file's encoding.
     *
     * @param filepath The path to a file.
     * @param stream A std::wifstream that has not yet been opened.
     * @param verbose If true, the file's detected encoding will be printed.
     */
    static void openFile(const std::string& filepath, std::wifstream& stream, bool verbose = false);

    /**
     * Determines if the path is a directory.
     *
     * @param path The path string.
     * @returns TRUE if the path is a directory; else FALSE.
     */
    static bool isDir(const std::string& path);

    /**
     * Creates a directory at the specified path.
     *
     * @param path The directory path string.
     * @throws runtime_error Throws if the directory creation fails.
     */
    static void makeDir(const std::string& path);

    /**
     * Determines if a path to a file system object such as a file or directory is valid.
     *
     * @param path The path string.
     * @returns TRUE if the path exists; else FALSE.
     */
    static bool pathExists(const std::string& path);

    /**
     * Strips characters from the end of a string.
     *
     * @param s The string to be modified.
     * @param c The character to be removed from the end of the string
     *     (removed continuously until the string no longer ends with this character).
     * @returns A reference to the input string.
     */
    static void rtrim(std::string& s, const char c);
    static void rtrim(std::wstring& s, const wchar_t c);

    /**
     * Replace all occurrences of the search string with the replacement string.
     *
     * @param subject The string being searched and replaced on.
     * @param search The string being searched for to be replaced.
     * @param replace The replacement string.
     * @returns A reference to the input string (subject).
     */
    static std::wstring& wstr_replace(std::wstring& subject, std::wstring search, std::wstring replace);

private:
    /**
     * Determines the number of bytes in a file.
     */
    static unsigned long long getFileSize(const std::string& filepath);

    /**
     * Prints out the detected encoding type.
     */
    static void dumpEncodingType(AutoIt::TextEncodingDetect::Encoding encoding);
};

#endif
