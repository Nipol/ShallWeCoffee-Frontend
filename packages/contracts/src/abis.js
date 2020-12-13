import ensPublicResolver from "./abis/ens-public-resolver.json";
import erc20 from "./abis/erc20.json";
import manager from "./abis/manager.json";
import managerFactory from "./abis/manager-factory.json";

const abis = {
  ERC20: erc20,
  ENS_PUBLIC_RESOLVER_ABI: ensPublicResolver,
  MANAGER_ABI: manager,
  MANAGER_FACTORY_ABI: managerFactory
};

export default abis;
