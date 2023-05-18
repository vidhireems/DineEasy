declare module 'node-cron' {
    function schedule(cronExpression: string, func: () => void): void;
  }
  