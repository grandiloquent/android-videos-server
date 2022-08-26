package euphoria.psycho.filemanager;

import android.app.Activity;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.SearchView;
import android.widget.SearchView.OnQueryTextListener;
import android.widget.TextView;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SearchActivity extends Activity {

    private ListView mListView;
    private ListAdapter mListAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.search_activity);
        mListView = findViewById(R.id.list_view);
        mListAdapter = new ListAdapter();
        mListView.setAdapter(mListAdapter);
        String dir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getParentFile(), "books").getAbsolutePath();
        mListAdapter.refresh(
               dir, null
        );
        mListView.setOnItemClickListener(new OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                if (mListAdapter.getItem(position).isDirectory())
                    mListAdapter.refresh(
                            mListAdapter.getItem(position).getAbsolutePath(),
                            null
                    );

            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuItem menuItem = menu.add(0, 0, 0, "搜索");
        menuItem.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);
        SearchView searchView = new SearchView(this);
        searchView.setIconified(true);
        searchView.setOnQueryTextListener(new OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                mListAdapter.refresh(null, query);
                return true;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });
        menuItem.setActionView(searchView);
        return super.onCreateOptionsMenu(menu);
    }

    public static String readAllText(File file) throws IOException {
        FileInputStream is = new FileInputStream(file);
        byte[] data = new byte[(int) file.length()];
        is.read(data);
        is.close();
        return new String(data, StandardCharsets.UTF_8);
    }

    private static class ListAdapter extends BaseAdapter {
        private List<File> mFiles = new ArrayList<>();
        private String mDirectory;

        public void refresh(String dir, String pattern) {
            if (dir == null) {
                dir = mDirectory;
            } else {
                mDirectory = dir;
            }
            Pattern pat = null;
            if (pattern != null) {
                pat = Pattern.compile(pattern);
            }
//            if (dir == null && pat != null) {
//                List<File> files = new ArrayList<>();
//                files.addAll(mFiles);
//                mFiles.clear();
//                for (File file : files) {
//                    try {
//                        String contents = readAllText(file);
//                        Matcher matcher = pat.matcher(contents);
//                        if (matcher.find()) {
//                            mFiles.add(file);
//                        }
//                    } catch (Exception ignored) {
//                    }
//                }
//                notifyDataSetChanged();
//                return;
//            }
            mFiles.clear();
            File[] files = new File(dir).listFiles(new FileFilter() {
                @Override
                public boolean accept(File pathname) {
                    return !pathname.isFile() || !pathname.getName().endsWith(".bak");
                }
            });
            Log.e("B5aOx2", String.format("refresh, %s %s", files.length,mFiles.size()));
            if (files == null) return;
            Arrays.sort(files, (o1, o2) -> {
                if (o1.isDirectory() && o2.isDirectory() || (o1.isFile() && o2.isFile())) {
                    return o1.getName().compareTo(o2.getName());
                } else if (o1.isDirectory()) {
                    return -1;
                } else {
                    return 1;
                }
            });
            for (File file : files) {
                if (pat == null)
                    mFiles.add(file);
                else {
                    try {
                        String contents = readAllText(file);
                        Matcher matcher = pat.matcher(contents);
                        if (matcher.find()) {
                            mFiles.add(file);
                        }

                    } catch (Exception ignored) {
                    }
                }
            }
            notifyDataSetChanged();
        }

        @Override
        public int getCount() {
            return mFiles.size();
        }

        @Override
        public File getItem(int position) {
            return mFiles.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, android.view.View convertView, ViewGroup parent) {
            if (convertView == null) {
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
                convertView = new TextView(parent.getContext());
                convertView.setLayoutParams(layoutParams);
                convertView.setPadding(30, 30, 30, 30);
            }
            ((TextView) convertView).setText(mFiles.get(position).getName());
            return convertView;
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
    }
}