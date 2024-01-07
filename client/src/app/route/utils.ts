import appRoutes from "./appRoutes";
// Promised based based navgation
export const navigateTo = async (path: string, opts?: any) => {
  try {
    if (opts) {
      await appRoutes.navigate(path, opts);
    } else {
      await appRoutes.navigate(path);
    }
  } catch (err) {
    console.error(err);
  }
};
