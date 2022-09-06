export type Config = {
  MYSQL: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  HTTP: {
    port: number;
  };
};

const defaultTo = <T>(
  value: any,
  defaultValue: T,
  possibleValues: T[] = []
): T => {
  if (possibleValues.length > 0 && possibleValues.includes(value)) {
    return value;
  }
  return (value as T) || defaultValue;
};

const { env } = process;

const config: Config = {
  MYSQL: {
    host: defaultTo(env.MYSQL_HOST, "db"),
    port: defaultTo(env.MYSQL_PORT, 3306),
    user: defaultTo(env.MYSQL_USERNAME, "user"),
    password: defaultTo(env.MYSQL_PASSWORD, "password"),
    database: defaultTo(env.MYSQL_DATABASE, "task"),
  },
  HTTP: {
    port: defaultTo(env.MYSQL_PORT, 3000),
  },
};

export default config;
