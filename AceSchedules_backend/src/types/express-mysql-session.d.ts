// src/types/express-mysql-session.d.ts
declare module 'express-mysql-session' {
    import { Store } from 'express-session';
  
    interface Options {
      host?: string;
      port?: number;
      user?: string;
      password?: string;
      database?: string;
      clearExpired?: boolean;
      checkExpirationInterval?: number;
      expiration?: number;
      createDatabaseTable?: boolean;
      schema?: {
        tableName: string;
        columnNames: {
          session_id: string;
          expires: string;
          data: string;
        };
      };
    }
  
    export default function(session: any): new (options: Options) => Store;
}
  