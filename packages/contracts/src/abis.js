import ensPublicResolver from "./abis/ens-public-resolver.json";
import erc20 from "./abis/erc20.json";
import manager from "./abis/manager.json";
import managerFactory from "./abis/manager-factory.json";
import uniSwap from "./abis/IUniswapV2Router02.json";
import uniswapFactory from "./abis/uniswap-factory.json";

const abis = {
  ERC20: erc20,
  ENS_PUBLIC_RESOLVER_ABI: ensPublicResolver,
  MANAGER_ABI: manager,
  MANAGER_FACTORY_ABI: managerFactory,
  UNI_SWAP_ABI: uniSwap,
  UNISWAP_FACTORY_ABI: uniswapFactory
};

export default abis;
