const _initRecord:{[evt:string]:boolean} = {};

export const setInitRecord = (evt:string, isNew:boolean) => {
  if (isNew) { 
    if (_initRecord[evt]) {
      throw Error('__initErr__');
    }
    _initRecord[evt] = true;
    return;
  }
  delete _initRecord[evt];
};

export const getInitRecord = (evt:string) => {
  return _initRecord[evt];
}