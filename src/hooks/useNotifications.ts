import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Task } from '../types/task';

export const useNotifications = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const checkPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  const scheduleNotification = useCallback((task: Task) => {
    if (!task.reminder) return;

    const timeUntilReminder = new Date(task.reminder).getTime() - Date.now();
    if (timeUntilReminder <= 0) return;

    setTimeout(() => {
      if (Notification.permission === 'granted' && !task.completed) {
        new Notification('Task Reminder', {
          body: task.title,
          icon: '/icon.png'
        });
      }
    }, timeUntilReminder);
  }, []);

  useEffect(() => {
    checkPermission();

    tasks.forEach(task => {
      if (task.reminder && !task.completed) {
        scheduleNotification(task);
      }
    });
  }, [tasks, checkPermission, scheduleNotification]);

  return { checkPermission };
};
