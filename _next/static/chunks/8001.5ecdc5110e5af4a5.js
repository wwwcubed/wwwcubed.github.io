"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8001],{34709:function(t,e,r){r.d(e,{D:function(){return p},F:function(){return u},I:function(){return s},a:function(){return l},b:function(){return uploadOrExtractURI},c:function(){return fetchTokenMetadataForContract},f:function(){return fetchTokenMetadata},g:function(){return getBaseUriFromBatch},u:function(){return uploadOrExtractURIs}});var n=r(99674),a=r(16441),i=r(2593),o=r(64146),c=r(48764).Buffer;let s=a.arrayify("0x80ac58cd"),l=a.arrayify("0xd9b67a26"),u={name:"Failed to load NFT metadata"};async function fetchTokenMetadata(t,e,r){let o;if(e.startsWith("data:application/json;base64")&&void 0!==c){let r=e.split(",")[1],a=JSON.parse(c.from(r,"base64").toString("utf-8"));return n.a.parse({...a,id:i.O$.from(t).toString(),uri:e})}let s=e.replace("{id}",a.hexZeroPad(i.O$.from(t).toHexString(),32).slice(2));try{o=await r.downloadJSON(s)}catch(a){let n=e.replace("{id}",i.O$.from(t).toString());try{o=await r.downloadJSON(n)}catch(r){console.warn(`failed to get token metadata: ${JSON.stringify({tokenId:t.toString(),tokenUri:e})} -- falling back to default metadata`),o=u}}return n.a.parse({...o,id:i.O$.from(t).toString(),uri:e})}async function fetchTokenMetadataForContract(t,e,a,c){let p;let d=(await r.e(5025).then(r.t.bind(r,25025,19))).default,f=new o.CH(t,d,e),[h,g]=await Promise.all([f.supportsInterface(s),f.supportsInterface(l)]);if(h){let n=(await Promise.resolve().then(r.t.bind(r,34161,19))).default,i=new o.CH(t,n,e);p=await i.tokenURI(a)}else if(g){let n=(await Promise.resolve().then(r.t.bind(r,50266,19))).default,i=new o.CH(t,n,e);p=await i.uri(a)}else throw Error("Contract must implement ERC 1155 or ERC 721.");return p?fetchTokenMetadata(a,p,c):n.a.parse({...u,id:i.O$.from(a).toString(),uri:""})}async function uploadOrExtractURI(t,e){return"string"==typeof t?t:await e.upload(n.C.parse(t))}async function uploadOrExtractURIs(t,e,r,a){if(void 0===t.find(t=>"string"!=typeof t))return t;if(void 0===t.find(t=>"object"!=typeof t)){let i=await e.uploadBatch(t.map(t=>n.C.parse(t)),{rewriteFileNames:{fileStartNumber:r||0},onProgress:a?.onProgress});return i}throw Error("NFT metadatas must all be of the same type (all URI or all NFTMetadataInput)")}function getBaseUriFromBatch(t){let e=t[0].substring(0,t[0].lastIndexOf("/"));for(let r=0;r<t.length;r++){let n=t[r].substring(0,t[r].lastIndexOf("/"));if(e!==n)throw Error(`Can only create batches with the same base URI for every entry in the batch. Expected '${e}' but got '${n}'`)}return e.replace(/\/$/,"")+"/"}let p=100},4411:function(t,e,r){r.d(e,{E:function(){return s},R:function(){return o},S:function(){return c},a:function(){return assertEnabled}});var n=r(2593),a=r(1604),i=r(31665);let o=a.z.union([a.z.date().transform(t=>n.O$.from(Math.floor(t.getTime()/1e3))),a.z.number().transform(t=>n.O$.from(t))]),c=o.default(new Date(0)),s=o.default(new Date(Date.now()+31536e7));function assertEnabled(t,e){if(!t)throw new i.x(e);return t}},72555:function(t,e,r){r.d(e,{C:function(){return ContractInterceptor}});let ContractInterceptor=class ContractInterceptor{constructor(t){this.contractWrapper=t}overrideNextTransaction(t){this.contractWrapper.withTransactionOverride(t)}}},67842:function(t,e,r){r.r(e),r.d(e,{MarketplaceV3:function(){return MarketplaceV3}});var n=r(4411),a=r(35618),i=r(31665),o=r(87029),c=r(72555),s=r(96708),l=r(38783),u=r(15492),p=r(66964);r(13550),r(77191),r(54146);let MarketplaceV3=class MarketplaceV3{static contractRoles=i.dC;get directListings(){return(0,n.a)(this.detectDirectListings(),i.dw)}get englishAuctions(){return(0,n.a)(this.detectEnglishAuctions(),i.dx)}get offers(){return(0,n.a)(this.detectOffers(),i.dy)}get chainId(){return this._chainId}constructor(t,e,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},u=arguments.length>4?arguments[4]:void 0,p=arguments.length>5?arguments[5]:void 0,d=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new i.cq(t,e,u,n,r);this._chainId=p,this.abi=i.bj.parse(u||[]),this.contractWrapper=d,this.storage=r,this.metadata=new a.C(this.contractWrapper,i.bZ,this.storage),this.app=new a.b(this.contractWrapper,this.metadata,this.storage),this.roles=new l.C(this.contractWrapper,MarketplaceV3.contractRoles),this.encoder=new o.C(this.contractWrapper),this.estimator=new a.G(this.contractWrapper),this.events=new a.a(this.contractWrapper),this.platformFees=new s.C(this.contractWrapper),this.interceptor=new c.C(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async prepare(t,e,r){return p.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:e,overrides:r})}async call(t,e,r){return this.contractWrapper.call(t,e,r)}detectDirectListings(){if((0,a.d)(this.contractWrapper,"DirectListings"))return new u.M(this.contractWrapper,this.storage)}detectEnglishAuctions(){if((0,a.d)(this.contractWrapper,"EnglishAuctions"))return new u.a(this.contractWrapper,this.storage)}detectOffers(){if((0,a.d)(this.contractWrapper,"Offers"))return new u.b(this.contractWrapper,this.storage)}}},99674:function(t,e,r){r.d(e,{B:function(){return s},C:function(){return l},N:function(){return u},a:function(){return p},s:function(){return setErc20Allowance}});var n=r(31665),a=r(1604),i=r(87029);let o=a.z.object({}).catchall(a.z.union([n.cw,a.z.unknown()])),c=a.z.union([a.z.array(o),o]).optional().nullable(),s=a.z.object({name:a.z.union([a.z.string(),a.z.number()]).optional().nullable(),description:a.z.string().nullable().optional().nullable(),image:n.cx.nullable().optional(),animation_url:n.cx.optional().nullable()}),l=s.extend({external_url:n.cx.nullable().optional(),background_color:n.cy.optional().nullable(),properties:c,attributes:c}).catchall(a.z.union([n.cw,a.z.unknown()])),u=a.z.union([l,a.z.string()]),p=l.extend({id:a.z.string(),uri:a.z.string(),image:a.z.string().nullable().optional(),external_url:a.z.string().nullable().optional(),animation_url:a.z.string().nullable().optional()});async function setErc20Allowance(t,e,a,o){if((0,i.i)(a))o.value=e;else{let i=(await Promise.resolve().then(r.t.bind(r,49242,19))).default,c=t.getSigner(),s=t.getProvider(),l=new n.cq(c||s,a,i,t.options,t.storage),u=await t.getSignerAddress(),p=t.address,d=await l.read("allowance",[u,p]);return d.lt(e)&&await l.sendTransaction("approve",[p,e]),o}}}}]);