
interface IData {
  [key: string]: any
}

export function makeModel<T>(model: any, data: IData): T {
  const instance = new model()
  Object.keys(data).forEach((key: string) => {
    instance[key] = data[key]
  })
  return instance
}
