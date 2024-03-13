"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8783],{35618:function(t,e,r){r.d(e,{C:function(){return ContractMetadata},G:function(){return GasCostEstimator},a:function(){return ContractEvents},b:function(){return ContractAppURI},d:function(){return detectContractFeature},h:function(){return hasFunction}});var a=r(31665),n=r(66964),o=r(61744),s=r(40721);function detectContractFeature(t,e){let r=(0,a.ai)(t.abi,e,t.extensions);return r}function hasFunction(t,e){return t in e.readContract.functions}let ContractMetadata=class ContractMetadata{featureName=a.cI.name;constructor(t,e,r){this.contractWrapper=t,this.schema=e,this.storage=r}parseOutputMetadata(t){return this.schema.output.parseAsync(t)}parseInputMetadata(t){return this.schema.input.parseAsync(t)}async get(){let t;if(this.supportsContractMetadata(this.contractWrapper)){let e=await this.contractWrapper.read("contractURI",[]);e&&e.includes("://")&&(t=await this.storage.downloadJSON(e))}if(!t)try{let e,r,n;try{hasFunction("name",this.contractWrapper)&&(e=await this.contractWrapper.read("name",[]))}catch(t){}try{hasFunction("symbol",this.contractWrapper)&&(r=await this.contractWrapper.read("symbol",[]))}catch(t){}try{n=await (0,a.K)(this.contractWrapper.address,this.contractWrapper.getProvider(),this.storage,this.contractWrapper.options)}catch(t){}t={name:e||n?.name,symbol:r,description:n?.info.title}}catch(t){throw Error("Could not fetch contract metadata")}return this.parseOutputMetadata(t)}set=(0,n.f)(async t=>{let e=await this._parseAndUploadMetadata(t),r=this.contractWrapper;if(this.supportsContractMetadata(r))return n.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setContractURI",args:[e],parse:t=>({receipt:t,data:this.get})});throw new a.x(a.cI)});update=(0,n.f)(async t=>await this.set.prepare({...await this.get(),...t}));async _parseAndUploadMetadata(t){let e=await this.parseInputMetadata(t);return this.storage.upload(e)}supportsContractMetadata(t){return detectContractFeature(t,"ContractMetadata")}};let ContractEvents=class ContractEvents{constructor(t){this.contractWrapper=t}addTransactionListener(t){this.contractWrapper.addListener(a.aZ.Transaction,t)}removeTransactionListener(t){this.contractWrapper.off(a.aZ.Transaction,t)}addEventListener(t,e){let r=this.contractWrapper.readContract.interface.getEvent(t),a=this.contractWrapper.address,n={address:a,topics:[this.contractWrapper.readContract.interface.getEventTopic(r)]},wrappedListener=t=>{let r=this.contractWrapper.readContract.interface.parseLog(t);e(this.toContractEvent(r.eventFragment,r.args,t))};return this.contractWrapper.getProvider().on(n,wrappedListener),()=>{this.contractWrapper.getProvider().off(n,wrappedListener)}}listenToAllEvents(t){let e=this.contractWrapper.address,r={address:e},wrappedListener=e=>{try{let r=this.contractWrapper.readContract.interface.parseLog(e);t(this.toContractEvent(r.eventFragment,r.args,e))}catch(t){console.error("Could not parse event:",e,t)}};return this.contractWrapper.getProvider().on(r,wrappedListener),()=>{this.contractWrapper.getProvider().off(r,wrappedListener)}}removeEventListener(t,e){let r=this.contractWrapper.readContract.interface.getEvent(t);this.contractWrapper.readContract.off(r.name,e)}removeAllListeners(){this.contractWrapper.readContract.removeAllListeners();let t=this.contractWrapper.address;this.contractWrapper.getProvider().removeAllListeners({address:t})}async getAllEvents(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{fromBlock:0,toBlock:"latest",order:"desc"},e=await this.contractWrapper.readContract.queryFilter({},t.fromBlock,t.toBlock),r=e.sort((e,r)=>"desc"===t.order?r.blockNumber-e.blockNumber:e.blockNumber-r.blockNumber);return this.parseEvents(r)}async getEvents(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{fromBlock:0,toBlock:"latest",order:"desc"},r=this.contractWrapper.readContract.interface.getEvent(t),a=e.filters?r.inputs.map(t=>e.filters[t.name]):[],n=this.contractWrapper.readContract.filters[r.name](...a),o=await this.contractWrapper.readContract.queryFilter(n,e.fromBlock,e.toBlock),s=o.sort((t,r)=>"desc"===e.order?r.blockNumber-t.blockNumber:t.blockNumber-r.blockNumber);return this.parseEvents(s)}parseEvents(t){return t.map(t=>{let e=Object.fromEntries(Object.entries(t).filter(t=>"function"!=typeof t[1]&&"args"!==t[0]));if(t.args){let r=Object.entries(t.args),a=r.slice(r.length/2,r.length),n={};for(let[t,e]of a)n[t]=e;return{eventName:t.event||"",data:n,transaction:e}}return{eventName:t.event||"",data:{},transaction:e}})}toContractEvent(t,e,r){let a=Object.fromEntries(Object.entries(r).filter(t=>"function"!=typeof t[1]&&"args"!==t[0])),n={};return t.inputs.forEach((t,r)=>{if(Array.isArray(e[r])){let a=t.components;if(a){let o=e[r];if("tuple[]"===t.type){let e=[];for(let t=0;t<o.length;t++){let r=o[t],n={};for(let t=0;t<a.length;t++){let e=a[t].name;n[e]=r[t]}e.push(n)}n[t.name]=e}else{let e={};for(let t=0;t<a.length;t++){let r=a[t].name;e[r]=o[t]}n[t.name]=e}}}else n[t.name]=e[r]}),{eventName:t.name,data:n,transaction:a}}};let GasCostEstimator=class GasCostEstimator{constructor(t){this.contractWrapper=t}async gasCostOf(t,e){let r=await (0,n.c)(this.contractWrapper.getProvider(),await this.contractWrapper.populateTransaction(t,e));return o.formatEther(r)}async gasLimitOf(t,e){return this.contractWrapper.estimateGas(t,e)}async currentGasPriceInGwei(){let t=await this.contractWrapper.getProvider().getGasPrice();return o.formatUnits(t,"gwei")}};let ContractAppURI=class ContractAppURI{featureName=a.cJ.name;constructor(t,e,r){this.contractWrapper=t,this.metadata=e,this.storage=r}async get(){return detectContractFeature(this.contractWrapper,"AppURI")?await this.contractWrapper.read("appURI",[]):(0,s.ov)((await this.metadata.get()).app_uri||"",this.storage.getGatewayUrls())}set=(0,n.f)(async t=>detectContractFeature(this.contractWrapper,"AppURI")?n.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setAppURI",args:[t]}):await this.metadata.update.prepare({app_uri:t}))}},38783:function(t,e,r){r.d(e,{C:function(){return ContractRoles}});var a=r(38776),n=r(31665),o=r(35618),s=r(66964),c=r(87029);let ContractRoles=class ContractRoles{featureName=n.d0.name;constructor(t,e){this.contractWrapper=t,this.roles=e}async getAll(){(0,a.Z)(this.roles.length,"this contract has no support for roles");let t={},e=Object.entries(this.roles);return(await Promise.all(e.map(t=>{let[,e]=t;return this.get(e)}))).forEach((r,a)=>t[e[a][1]]=r),t}async get(t){(0,a.Z)(this.roles.includes(t),`this contract does not support the "${t}" role`);let e=this.contractWrapper;if((0,o.h)("getRoleMemberCount",e)&&(0,o.h)("getRoleMember",e)){let r=(0,n.H)(t),a=(await e.read("getRoleMemberCount",[r])).toNumber();return await Promise.all(Array.from(Array(a).keys()).map(t=>e.read("getRoleMember",[r,t])))}throw Error("Contract does not support enumerating roles. Please implement IPermissionsEnumerable to unlock this functionality.")}setAll=(0,s.f)(async(t,e)=>{let r=e||await this.contractWrapper.getSignerAddress(),o=new c.C(this.contractWrapper),i=Object.keys(t);(0,a.Z)(i.length,"you must provide at least one role to set"),(0,a.Z)(i.every(t=>this.roles.includes(t)),"this contract does not support the given role");let p=await this.getAll(),l=[],h=i.sort(t=>"admin"===t?1:-1);for(let e=0;e<h.length;e++){let a=h[e],[s,c]=await Promise.all([Promise.all(t[a]?.map(t=>n.aL(t))||[]),Promise.all(p[a]?.map(t=>n.aL(t))||[])]),i=s.filter(t=>!c.includes(t)),u=c.filter(t=>!s.includes(t));if(u.length>1){let t=u.indexOf(r);t>-1&&(u.splice(t,1),u.push(r))}if(i.length&&i.forEach(t=>{l.push(o.encode("grantRole",[(0,n.H)(a),t]))}),u.length){let t=await Promise.all(u.map(t=>this.getRevokeRoleFunctionName(t)));t.forEach((t,e)=>l.push(o.encode(t,[(0,n.H)(a),u[e]])))}}return s.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[l]})});async verify(t,e){await Promise.all(t.map(async t=>{let[r,a]=await Promise.all([this.get(t),(0,n.aL)(e)]);if(!r.map(t=>t.toLowerCase()).includes(a.toLowerCase()))throw new n.o(a,t)}))}grant=(0,s.f)(async(t,e)=>{(0,a.Z)(this.roles.includes(t),`this contract does not support the "${t}" role`);let r=await (0,n.aL)(e);return s.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"grantRole",args:[(0,n.H)(t),r]})});revoke=(0,s.f)(async(t,e)=>{(0,a.Z)(this.roles.includes(t),`this contract does not support the "${t}" role`);let r=await (0,n.aL)(e),o=await this.getRevokeRoleFunctionName(r);return s.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:o,args:[(0,n.H)(t),r]})});async getRevokeRoleFunctionName(t){let[e,r]=await Promise.all([(0,n.aL)(t),this.contractWrapper.getSignerAddress()]);return r.toLowerCase()===e.toLowerCase()?"renounceRole":"revokeRole"}}}}]);