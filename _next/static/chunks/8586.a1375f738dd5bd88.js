"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8586,5664],{83287:function(e,t,n){n.d(t,{W:function(){return WagmiConnector}});var r=n(22555),i=n(54146);let WagmiConnector=class WagmiConnector extends i.Z{constructor(e){let{chains:t=r.gL9,options:n}=e;super(),this.chains=t,this.options=n}getBlockExplorerUrls(e){let t=e.explorers?.map(e=>e.url)??[];return t.length>0?t:void 0}isChainUnsupported(e){return!this.chains.some(t=>t.chainId===e)}updateChains(e){this.chains=e}}},83815:function(e,t,n){n.d(t,{A:function(){return AddChainError},C:function(){return ChainNotConfiguredError},R:function(){return ResourceUnavailableError},S:function(){return SwitchChainError},U:function(){return UserRejectedRequestError},a:function(){return ConnectorNotFoundError}});var r=n(69552);let RpcError=class RpcError extends Error{constructor(e,t){let{cause:n,code:r,data:i}=t;if(!Number.isInteger(r))throw Error('"code" must be an integer.');if(!e||"string"!=typeof e)throw Error('"message" must be a nonempty string.');super(`${e}. Cause: ${JSON.stringify(n)}`),this.cause=n,this.code=r,this.data=i}};let ProviderRpcError=class ProviderRpcError extends RpcError{constructor(e,t){let{cause:n,code:r,data:i}=t;if(!(Number.isInteger(r)&&r>=1e3&&r<=4999))throw Error('"code" must be an integer such that: 1000 <= code <= 4999');super(e,{cause:n,code:r,data:i})}};let AddChainError=class AddChainError extends Error{constructor(){super(...arguments),(0,r._)(this,"name","AddChainError"),(0,r._)(this,"message","Error adding chain")}};let ChainNotConfiguredError=class ChainNotConfiguredError extends Error{constructor(e){let{chainId:t,connectorId:n}=e;super(`Chain "${t}" not configured for connector "${n}".`),(0,r._)(this,"name","ChainNotConfigured")}};let ConnectorNotFoundError=class ConnectorNotFoundError extends Error{constructor(){super(...arguments),(0,r._)(this,"name","ConnectorNotFoundError"),(0,r._)(this,"message","Connector not found")}};let ResourceUnavailableError=class ResourceUnavailableError extends RpcError{constructor(e){super("Resource unavailable",{cause:e,code:-32002}),(0,r._)(this,"name","ResourceUnavailable")}};let SwitchChainError=class SwitchChainError extends ProviderRpcError{constructor(e){super("Error switching chain",{cause:e,code:4902}),(0,r._)(this,"name","SwitchChainError")}};let UserRejectedRequestError=class UserRejectedRequestError extends ProviderRpcError{constructor(e){super("User rejected request",{cause:e,code:4001}),(0,r._)(this,"name","UserRejectedRequestError")}}},59014:function(e,t,n){n.d(t,{n:function(){return normalizeChainId}});function normalizeChainId(e){return"string"==typeof e?Number.parseInt(e,"0x"===e.trim().substring(0,2)?16:10):"bigint"==typeof e?Number(e):e}},95664:function(e,t,n){n.d(t,{InjectedConnector:function(){return InjectedConnector}});var r=n(69552),i=n(83287),s=n(83815),o=n(24528),c=n(81764),a=n(19485),h=n(241),d=n(16441),u=n(59014);n(54146);let InjectedConnector=class InjectedConnector extends i.W{constructor(e){let t={shimDisconnect:!0,getProvider:()=>{if((0,o.a)(globalThis.window))return globalThis.window.ethereum},...e.options};super({chains:e.chains,options:t}),(0,r._)(this,"shimDisconnectKey","injected.shimDisconnect"),(0,r._)(this,"onAccountsChanged",async e=>{0===e.length?this.emit("disconnect"):this.emit("change",{account:a.getAddress(e[0])})}),(0,r._)(this,"onChainChanged",e=>{let t=(0,u.n)(e),n=this.isChainUnsupported(t);this.emit("change",{chain:{id:t,unsupported:n}})}),(0,r._)(this,"onDisconnect",async e=>{if(1013===e.code){let e=await this.getProvider();if(e)try{let e=await this.getAccount();if(e)return}catch{}}this.emit("disconnect"),this.options.shimDisconnect&&await this.connectorStorage.removeItem(this.shimDisconnectKey)});let n=t.getProvider();if("string"==typeof t.name)this.name=t.name;else if(n){let e=function(e){if(!e)return"Injected";let getName=e=>e.isAvalanche?"Core Wallet":e.isBitKeep?"BitKeep":e.isBraveWallet?"Brave Wallet":e.isCoinbaseWallet?"Coinbase Wallet":e.isExodus?"Exodus":e.isFrame?"Frame":e.isKuCoinWallet?"KuCoin Wallet":e.isMathWallet?"MathWallet":e.isOneInchIOSWallet||e.isOneInchAndroidWallet?"1inch Wallet":e.isOpera?"Opera":e.isPortal?"Ripio Portal":e.isTally?"Tally":e.isTokenPocket?"TokenPocket":e.isTokenary?"Tokenary":e.isTrust||e.isTrustWallet?"Trust Wallet":e.isMetaMask?"MetaMask":void 0;if(e.providers?.length){let t=new Set,n=1;for(let r of e.providers){let e=getName(r);e||(e=`Unknown Wallet #${n}`,n+=1),t.add(e)}let r=[...t];return r.length?r:r[0]??"Injected"}return getName(e)??"Injected"}(n);t.name?this.name=t.name(e):"string"==typeof e?this.name=e:this.name=e[0]}else this.name="Injected";this.id="injected",this.ready=!!n,this.connectorStorage=e.connectorStorage}async connect(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{let t=await this.getProvider();if(!t)throw new s.a;this.setupListeners(),this.emit("message",{type:"connecting"});let n=await t.request({method:"eth_requestAccounts"}),r=a.getAddress(n[0]),i=await this.getChainId(),o=this.isChainUnsupported(i);if(e.chainId&&i!==e.chainId)try{await this.switchChain(e.chainId),i=e.chainId,o=this.isChainUnsupported(e.chainId)}catch(t){console.error(`Could not switch to chain id: ${e.chainId}`,t)}this.options.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");let c={account:r,chain:{id:i,unsupported:o},provider:t};return this.emit("connect",c),c}catch(e){if(this.isUserRejectedRequestError(e))throw new s.U(e);if(-32002===e.code)throw new s.R(e);throw e}}async disconnect(){let e=await this.getProvider();e?.removeListener&&(e.removeListener("accountsChanged",this.onAccountsChanged),e.removeListener("chainChanged",this.onChainChanged),e.removeListener("disconnect",this.onDisconnect),this.options.shimDisconnect&&await this.connectorStorage.removeItem(this.shimDisconnectKey))}async getAccount(){let e=await this.getProvider();if(!e)throw new s.a;let t=await e.request({method:"eth_accounts"});return a.getAddress(t[0])}async getChainId(){let e=await this.getProvider();if(!e)throw new s.a;return e.request({method:"eth_chainId"}).then(u.n)}async getProvider(){let e=this.options.getProvider();return e&&(this._provider=e),this._provider}async getSigner(){let{chainId:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},[t,n]=await Promise.all([this.getProvider(),this.getAccount()]);return new h.Q(t,e).getSigner(n)}async isAuthorized(){try{if(this.options.shimDisconnect&&!await this.connectorStorage.getItem(this.shimDisconnectKey))return!1;let e=await this.getProvider();if(!e)throw new s.a;let t=await this.getAccount();return!!t}catch{return!1}}async switchChain(e){let t=await this.getProvider();if(!t)throw new s.a;let n=d.hexValue(e);try{await t.request({method:"wallet_switchEthereumChain",params:[{chainId:n}]});let r=this.chains.find(t=>t.chainId===e);if(r)return r;return{chainId:e,name:`Chain ${n}`,slug:`${n}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpc:[""],chain:"",shortName:"",testnet:!0}}catch(i){let r=this.chains.find(t=>t.chainId===e);if(!r)throw new s.C({chainId:e,connectorId:this.id});if(4902===i.code||i?.data?.originalError?.code===4902)try{return await t.request({method:"wallet_addEthereumChain",params:[{chainId:n,chainName:r.name,nativeCurrency:r.nativeCurrency,rpcUrls:(0,c.g)(r),blockExplorerUrls:this.getBlockExplorerUrls(r)}]}),r}catch(e){if(this.isUserRejectedRequestError(e))throw new s.U(i);throw new s.A}if(this.isUserRejectedRequestError(i))throw new s.U(i);throw new s.S(i)}}async setupListeners(){let e=await this.getProvider();e.on&&(e.on("accountsChanged",this.onAccountsChanged),e.on("chainChanged",this.onChainChanged),e.on("disconnect",this.onDisconnect))}isUserRejectedRequestError(e){return 4001===e.code}}},48586:function(e,t,n){n.d(t,{OKXConnector:function(){return OKXConnector}});var r=n(69552),i=n(83815),s=n(26340),o=n(95664),c=n(19485),a=n(98294);n(54146);let OKXConnector=class OKXConnector extends o.InjectedConnector{constructor(e){let t={name:"OKX",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:a.g},n={...t,...e.options};super({chains:e.chains,options:n,connectorStorage:e.connectorStorage}),(0,r._)(this,"id",s.w.okx)}async connect(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{let t=await this.getProvider();if(!t)throw new i.a;this.setupListeners(),this.emit("message",{type:"connecting"});let n=null;if(this.options?.shimDisconnect&&!this.connectorStorage.getItem(this.shimDisconnectKey)){n=await this.getAccount().catch(()=>null);let e=!!n;if(e)try{await t.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}catch(e){if(this.isUserRejectedRequestError(e))throw new i.U(e)}}if(!n){let e=await t.request({method:"eth_requestAccounts"});n=c.getAddress(e[0])}let r=await this.getChainId(),s=this.isChainUnsupported(r);if(e.chainId&&r!==e.chainId)try{await this.switchChain(e.chainId),r=e.chainId,s=this.isChainUnsupported(e.chainId)}catch(t){console.error(`Could not switch to chain id : ${e.chainId}`,t)}this.options?.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");let o={chain:{id:r,unsupported:s},provider:t,account:n};return this.emit("connect",o),o}catch(e){if(this.isUserRejectedRequestError(e))throw new i.U(e);if(-32002===e.code)throw new i.R(e);throw e}}async switchAccount(){let e=await this.getProvider();await e.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}}}}]);