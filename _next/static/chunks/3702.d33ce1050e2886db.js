"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3702],{72555:function(t,r,e){e.d(r,{C:function(){return ContractInterceptor}});let ContractInterceptor=class ContractInterceptor{constructor(t){this.contractWrapper=t}overrideNextTransaction(t){this.contractWrapper.withTransactionOverride(t)}}},96708:function(t,r,e){e.d(r,{C:function(){return ContractPlatformFee}});var a=e(66964),n=e(31665);let ContractPlatformFee=class ContractPlatformFee{featureName=n.dq.name;constructor(t){this.contractWrapper=t}async get(){let[t,r]=await this.contractWrapper.read("getPlatformFeeInfo",[]);return n.bF.parseAsync({platform_fee_recipient:t,platform_fee_basis_points:r})}set=(0,a.f)(async t=>{let r=await n.bF.parseAsync(t);return a.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setPlatformFeeInfo",args:[r.platform_fee_recipient,r.platform_fee_basis_points]})})}},54299:function(t,r,e){e.d(r,{C:function(){return ContractPrimarySale}});var a=e(66964),n=e(31665);let ContractPrimarySale=class ContractPrimarySale{featureName=n.d3.name;constructor(t){this.contractWrapper=t}async getRecipient(){let t=await this.contractWrapper.read("primarySaleRecipient",[]);return t}setRecipient=(0,a.f)(async t=>a.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setPrimarySaleRecipient",args:[t]}))}},47782:function(t,r,e){e.d(r,{S:function(){return StandardErc721}});var a=e(31665),n=e(66964),c=e(59002);let StandardErc721=class StandardErc721{get chainId(){return this._chainId}constructor(t,r,e){this.contractWrapper=t,this.storage=r,this.erc721=new c.E(this.contractWrapper,this.storage,e),this._chainId=e}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async getAll(t){return this.erc721.getAll(t)}async getOwned(t,r){return t&&(t=await (0,a.aL)(t)),this.erc721.getOwned(t,r)}async getOwnedTokenIds(t){return t&&(t=await (0,a.aL)(t)),this.erc721.getOwnedTokenIds(t)}async totalSupply(){return this.erc721.totalCirculatingSupply()}async get(t){return this.erc721.get(t)}async ownerOf(t){return this.erc721.ownerOf(t)}async balanceOf(t){return this.erc721.balanceOf(t)}async balance(){return this.erc721.balance()}async isApproved(t,r){return this.erc721.isApproved(t,r)}transfer=(0,n.f)(async(t,r)=>this.erc721.transfer.prepare(t,r));setApprovalForAll=(0,n.f)(async(t,r)=>this.erc721.setApprovalForAll.prepare(t,r));setApprovalForToken=(0,n.f)(async(t,r)=>n.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"approve",args:[await (0,a.aL)(t),r]}))}},83702:function(t,r,e){e.r(r),e.d(r,{NFTDrop:function(){return NFTDrop}});var a=e(2593),n=e(9279),c=e(34709),s=e(31665),i=e(66964),o=e(35618),p=e(87029),h=e(72555),l=e(52027),u=e(96708),d=e(38783),m=e(54299),f=e(78079),y=e(47782),g=e(70853);e(13550),e(77191),e(54146),e(64063);let NFTDrop=class NFTDrop extends y.S{static contractRoles=s.dB;constructor(t,r,e){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},n=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new s.cq(t,r,n,a,e);super(i,e,c),this.abi=s.bj.parse(n||[]),this.metadata=new o.C(this.contractWrapper,s.bR,this.storage),this.app=new o.b(this.contractWrapper,this.metadata,this.storage),this.roles=new d.C(this.contractWrapper,NFTDrop.contractRoles),this.royalties=new l.C(this.contractWrapper,this.metadata),this.sales=new m.C(this.contractWrapper),this.claimConditions=new f.D(this.contractWrapper,this.metadata,this.storage),this.encoder=new p.C(this.contractWrapper),this.estimator=new o.G(this.contractWrapper),this.events=new o.a(this.contractWrapper),this.platformFees=new u.C(this.contractWrapper),this.revealer=new l.D(this.contractWrapper,this.storage,s.cP.name,()=>this.erc721.nextTokenIdToMint()),this.interceptor=new h.C(this.contractWrapper),this.owner=new l.a(this.contractWrapper),this.checkout=new g.P(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async totalSupply(){let[t,r]=await Promise.all([this.totalClaimedSupply(),this.totalUnclaimedSupply()]);return t.add(r)}async getAllClaimed(t){let r=a.O$.from(t?.start||0).toNumber(),e=a.O$.from(t?.count||c.D).toNumber(),n=Math.min((await this.contractWrapper.read("nextTokenIdToClaim",[])).toNumber(),r+e);return await Promise.all(Array.from(Array(n).keys()).map(t=>this.get(t.toString())))}async getAllUnclaimed(t){let r=a.O$.from(t?.start||0).toNumber(),e=a.O$.from(t?.count||c.D).toNumber(),n=a.O$.from(Math.max((await this.contractWrapper.read("nextTokenIdToClaim",[])).toNumber(),r)),s=a.O$.from(Math.min((await this.contractWrapper.read("nextTokenIdToMint",[])).toNumber(),n.toNumber()+e));return await Promise.all(Array.from(Array(s.sub(n).toNumber()).keys()).map(t=>this.erc721.getTokenMetadata(n.add(t).toString())))}async totalClaimedSupply(){return this.erc721.totalClaimedSupply()}async totalUnclaimedSupply(){return this.erc721.totalUnclaimedSupply()}async isTransferRestricted(){let t=await this.contractWrapper.read("hasRole",[(0,s.H)("transfer"),n.d]);return!t}createBatch=(0,i.f)(async(t,r)=>this.erc721.lazyMint.prepare(t,r));async getClaimTransaction(t,r){let e=!(arguments.length>2)||void 0===arguments[2]||arguments[2];return this.erc721.getClaimTransaction(t,r,{checkERC20Allowance:e})}claimTo=(0,i.f)((()=>{var t=this;return async function(r,e){let a=!(arguments.length>2)||void 0===arguments[2]||arguments[2];return t.erc721.claimTo.prepare(r,e,{checkERC20Allowance:a})}})());claim=(0,i.f)((()=>{var t=this;return async function(r){let e=!(arguments.length>1)||void 0===arguments[1]||arguments[1];return t.claimTo.prepare(await t.contractWrapper.getSignerAddress(),r,e)}})());burn=(0,i.f)(async t=>this.erc721.burn.prepare(t));async get(t){return this.erc721.get(t)}async ownerOf(t){return this.erc721.ownerOf(t)}async balanceOf(t){return this.erc721.balanceOf(t)}async balance(){return this.erc721.balance()}async isApproved(t,r){return this.erc721.isApproved(t,r)}transfer=(0,i.f)(async(t,r)=>this.erc721.transfer.prepare(t,r));setApprovalForAll=(0,i.f)(async(t,r)=>this.erc721.setApprovalForAll.prepare(t,r));setApprovalForToken=(0,i.f)(async(t,r)=>i.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"approve",args:[t,r]}));async prepare(t,r,e){return i.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:e})}async call(t,r,e){return this.contractWrapper.call(t,r,e)}}},70853:function(t,r,e){e.d(r,{P:function(){return PaperCheckout}});var a=e(31665),n=e(38776);let c="https://paper.xyz/api/2022-08-12/platform/thirdweb",s={[a.aS.Mainnet]:"Ethereum",[a.aS.Goerli]:"Goerli",[a.aS.Polygon]:"Polygon",[a.aS.Mumbai]:"Mumbai",[a.aS.Avalanche]:"Avalanche"};async function fetchRegisteredCheckoutId(t,r){let e=((0,n.Z)(r in s,`chainId not supported by paper: ${r}`),s[r]),a=await fetch(`${c}/register-contract?contractAddress=${t}&chain=${e}`),i=await a.json();return(0,n.Z)(i.result.id,"Contract is not registered with paper"),i.result.id}let i={expiresInMinutes:15,feeBearer:"BUYER",sendEmailOnSuccess:!0,redirectAfterPayment:!1};async function createCheckoutLinkIntent(t,r){let e=await fetch(`${c}/checkout-link-intent`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contractId:t,...i,...r,metadata:{...r.metadata,via_platform:"thirdweb"},hideNativeMint:!0,hidePaperWallet:!!r.walletAddress,hideExternalWallet:!0,hidePayWithCrypto:!0,usePaperKey:!1})}),a=await e.json();return(0,n.Z)(a.checkoutLinkIntentUrl,"Failed to create checkout link intent"),a.checkoutLinkIntentUrl}let PaperCheckout=class PaperCheckout{constructor(t){this.contractWrapper=t}async getCheckoutId(){return fetchRegisteredCheckoutId(this.contractWrapper.address,await this.contractWrapper.getChainID())}async isEnabled(){try{return!!await this.getCheckoutId()}catch(t){return!1}}async createLinkIntent(t){return await createCheckoutLinkIntent(await this.getCheckoutId(),t)}}}}]);