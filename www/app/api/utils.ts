export function Logger(endpoint: string) {
  const info = (...msg: any) => {
    if (!process.env.DISABLE_LOGGING) {
      console.log(Date.now(), '[INFO]', endpoint, ...msg);
    }
  };
  const debug = (...msg: any) => {
    if (!process.env.DISABLE_LOGGING) {
      console.log(Date.now(), '[DEBUG]', endpoint, ...msg);
    }
  };
  const error = (...msg: any) => {
    if (!process.env.DISABLE_LOGGING) {
      console.error(Date.now(), '[ERROR]', endpoint, ...msg);
    }
  };
  return { info, error, debug };
}
