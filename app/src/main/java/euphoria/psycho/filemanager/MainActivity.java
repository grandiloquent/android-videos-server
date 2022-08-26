package euphoria.psycho.filemanager;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.net.Uri;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.provider.Settings;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.FrameLayout;

public class MainActivity extends Activity {

    public static final String HTTP_LOCALHOST_8001 = "http://localhost:8001";

    static {
        System.loadLibrary("native-lib");
    }

    private WebView mWebView;

    public static native void load(AssetManager mgr);

    public static void requestStoragePermissions(Activity context, boolean request) {
        if (VERSION.SDK_INT >= VERSION_CODES.R) {
            if (request && !Environment.isExternalStorageManager()) {
                try {
                    Uri uri = Uri.parse("package:" + BuildConfig.APPLICATION_ID);
                    Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION, uri);
                    context.startActivity(intent);
                } catch (Exception ex) {
                    Intent intent = new Intent();
                    intent.setAction(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
                    context.startActivity(intent);
                }
            }
        } else {
            if (context.checkSelfPermission("android.permission.WRITE_EXTERNAL_STORAGE") != PackageManager.PERMISSION_GRANTED) {
                context.requestPermissions(new String[]{"android.permission.WRITE_EXTERNAL_STORAGE"}, 100);
            }
        }
    }

    public native static void startServer(String host);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        load(getAssets());
        requestStoragePermissions(this, true);
        Intent starter = new Intent(this, FileService.class);
        if (VERSION.SDK_INT >= VERSION_CODES.O) {
            startForegroundService(starter);
        }
        setContentView(R.layout.main_activity);
        mWebView = findViewById(R.id.web_view);
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                getActionBar().setTitle(view.getTitle());
                super.onPageFinished(view, url);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        mWebView.setWebChromeClient(new CustomWebChromeClient(this));
        mWebView.addJavascriptInterface(new WebAppInterface(), "NativeAndroid");
        mWebView.loadUrl(PreferenceManager.getDefaultSharedPreferences(this)
                .getString("URL", HTTP_LOCALHOST_8001));
    }

    @Override
    protected void onPause() {
        if (mWebView != null)
            PreferenceManager.getDefaultSharedPreferences(this)
                    .edit()
                    .putString("URL", mWebView.getUrl())
                    .apply();
        super.onPause();
    }

    @Override
    public void onBackPressed() {
        if (mWebView.canGoBack()) {
            mWebView.goBack();
            return;
        }
        super.onBackPressed();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.add(0, 1, 0, "首页");
        menu.add(0, 3, 0, "编辑");

        menu.add(0, 5, 0, "输入");
        menu.add(0, 2, 0, "刷新");
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == 1) {
            mWebView.loadUrl(HTTP_LOCALHOST_8001);
        }
        if (item.getItemId() == 2) {
            mWebView.reload();
        }
        if (item.getItemId() == 3) {
            mWebView.loadUrl("http://47.106.105.122/admin/tasks");
//            Intent intent = new Intent(this, SearchActivity.class);
//            startActivity(intent);
        }

        if(item.getItemId()==5){
            EditText editText = new EditText(this);
            editText.requestFocus();
            AlertDialog dialog = new Builder(this)
                    .setTitle("输入")
                    .setView(editText)
                    .setPositiveButton(android.R.string.ok, (dialogInterface, i) -> {
                        mWebView.loadUrl(editText.getText().toString());
                        dialogInterface.dismiss();
                    }).setNegativeButton(android.R.string.cancel, (dialogInterface, which) -> {
                        dialogInterface.dismiss();
                    })
                    .create();
            dialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);
            dialog.show();
        }
        return super.onOptionsItemSelected(item);
    }

    public class WebAppInterface {
        @JavascriptInterface
        public String readText() {
            ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
            ClipData clipData = clipboard.getPrimaryClip();
            if (clipData.getItemCount() > 0) {
                CharSequence sequence = clipboard.getPrimaryClip().getItemAt(0).getText();
                if (sequence != null)
                    return sequence.toString();
            }
            return null;
        }

        @JavascriptInterface
        public void writeText(String text) {
            ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
            ClipData clip = ClipData.newPlainText("demo", text);
            clipboard.setPrimaryClip(clip);
        }
    }

    public class CustomWebChromeClient extends WebChromeClient {
        private MainActivity mMainActivity;
        private View mCustomView;
        private WebChromeClient.CustomViewCallback mCustomViewCallback;
        protected FrameLayout mFullscreenContainer;
        private int mOriginalOrientation;
        private int mOriginalSystemUiVisibility;

        public CustomWebChromeClient(MainActivity mainActivity) {
            mMainActivity = mainActivity;
        }

        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
            Log.e("B5aOx2", String.format("onConsoleMessage, %s\n%s", consoleMessage.message(), consoleMessage.lineNumber()));
            return super.onConsoleMessage(consoleMessage);
        }

        public void onHideCustomView() {
            ((FrameLayout) mMainActivity.getWindow().getDecorView()).removeView(this.mCustomView);
            this.mCustomView = null;
            mMainActivity.getWindow().getDecorView().setSystemUiVisibility(this.mOriginalSystemUiVisibility);
            mMainActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            this.mCustomViewCallback.onCustomViewHidden();
            this.mCustomViewCallback = null;
        }

        @Override
        public void onShowCustomView(View paramView, CustomViewCallback paramCustomViewCallback) {
            if (this.mCustomView != null) {
                onHideCustomView();
                return;
            }
            this.mCustomView = paramView;
            this.mOriginalSystemUiVisibility = mMainActivity.getWindow().getDecorView().getSystemUiVisibility();
            this.mOriginalOrientation = mMainActivity.getRequestedOrientation();
            this.mCustomViewCallback = paramCustomViewCallback;
            ((FrameLayout) mMainActivity.getWindow().getDecorView()).addView(this.mCustomView, new FrameLayout.LayoutParams(-1, -1));
            mMainActivity.getWindow().getDecorView().setSystemUiVisibility(3846 | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            mMainActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

        }


    }
}