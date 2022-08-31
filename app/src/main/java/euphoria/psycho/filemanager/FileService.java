package euphoria.psycho.filemanager;

import android.app.Notification;
import android.app.Notification.Builder;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.IBinder;
import android.os.Process;

import static euphoria.psycho.filemanager.MainActivity.startServer;

public class FileService extends Service {

    private static final String FILE_SERVER = "文件服务器";
    private NotificationManager mNotificationManager;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private Notification showNotification(String title) {
        Builder builder;
        if (VERSION.SDK_INT >= VERSION_CODES.O) {
            builder = new Builder(this, FILE_SERVER);
        } else {
            builder = new Builder(this);
        }
        Intent intent = new Intent(this, FileService.class);
        intent.setAction("CLOSE");
        builder.setSmallIcon(android.R.drawable.stat_sys_download)
                .setContentTitle(title)
                .setContentIntent(PendingIntent.getService(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT));
        return builder.build();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        if (VERSION.SDK_INT >= VERSION_CODES.O) {
            createNotificationChannel(this, FILE_SERVER, "文件服务器");
        }
        mNotificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        startForeground(hashCode(), showNotification("文件服务器"));
        new Thread(() -> {
            Process.setThreadPriority(Process.THREAD_PRIORITY_BACKGROUND);
            startServer(null);//null "192.168.8.55"
        }).start();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent.getAction() != null && intent.getAction().equals("CLOSE")) {
            if (VERSION.SDK_INT >= VERSION_CODES.N) {
                stopForeground(hashCode());
            }
            stopSelf();
        }
        return START_NOT_STICKY;
    }

    public static void createNotificationChannel(Context context, String id, CharSequence name) {
        NotificationChannel channel;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            channel = new NotificationChannel(id, name, NotificationManager.IMPORTANCE_LOW);
            context.getSystemService(NotificationManager.class)
                    .createNotificationChannel(channel);
        }
    }

}