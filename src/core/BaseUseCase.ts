export abstract class BaseUseCase<IReq, IRes> {
  public abstract exec(params: IReq): Promise<IRes>
}
