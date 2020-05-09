const compLoader = (page) => {
  return import(`../${page}`);
};

export default compLoader;
