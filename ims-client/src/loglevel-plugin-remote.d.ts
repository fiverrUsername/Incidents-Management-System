declare module 'loglevel-plugin-remote' {
    interface LogMethod {
      (msg: string): void;
      (format: string, ...params: any[]): void;
    }
  
    interface RemoteLogPlugin {
      plain: any;
      (...args: any[]): void;
      methodFactory(methodName: string): LogMethod;
    }
  
    const remote: RemoteLogPlugin;
    export = remote;
  }
  