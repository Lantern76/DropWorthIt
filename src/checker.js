// Claim-link checker. Runs entirely in the browser; never fetches or opens the URL typed in.
(function(){var f=document.getElementById('ck'),inp=document.getElementById('ck-in'),out=document.getElementById('ck-out'),dat=document.getElementById('dw-domains');if(!f||!inp||!out||!dat)return;
var D=JSON.parse(dat.textContent).drops;
function host(v){v=String(v||'').trim();if(!v)return'';if(!/^[a-z][a-z0-9+.-]*:\/\//i.test(v))v='https://'+v;try{return new URL(v).hostname.toLowerCase().replace(/^www\./,'').replace(/\.$/,'')}catch(e){return null}}
function lev(a,b){var m=a.length,n=b.length,d=[],i,j;for(i=0;i<=m;i++){d[i]=[i]}for(j=1;j<=n;j++)d[0][j]=j;for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function say(cls,title,body){out.className='ck-result card '+cls;out.replaceChildren();var h=document.createElement('h2');h.textContent=title;out.appendChild(h);body.forEach(function(t){var p=document.createElement('p');p.textContent=t;out.appendChild(p)});out.hidden=false}
var NOTSAFE='Not in our list. That does not mean it\u2019s safe; only use the official domain.';
function run(ev){if(ev)ev.preventDefault();var h=host(inp.value);if(h==='')return;if(h===null)return say('bad','That doesn\u2019t look like a web address',['Paste the address only, for example claim.example.xyz. '+NOTSAFE]);
var fake=D.filter(function(d){return d.knownFakes.some(function(k){return k.domain.toLowerCase()===h})})[0];
if(fake)return say('bad','Known fake: do not visit',[h+' was named as a fake by '+fake.project+' itself. Close it. Never connect a wallet or type a seed phrase there.']);
var hit=D.filter(function(d){return d.claimDomain&&d.claimDomain.toLowerCase()===h})[0];
if(hit)return hit.claimVerified?say('ok','Matches the claim domain we list for '+hit.project,['We confirmed '+h+' with an official '+hit.project+' source. Still type it yourself, and never share your seed phrase. A real claim never asks for it.']):say('warn','Listed for '+hit.project+', but unverified',[h+' is unverified, do not use until confirmed by '+hit.project+'\u2019s official site or X account.']);
var near=D.filter(function(d){if(!d.claimDomain)return false;var c=d.claimDomain.toLowerCase(),parts=c.split('.'),base=parts.slice(-2).join('.'),brand=parts[parts.length-2];if(h===base||h.endsWith('.'+base))return false;return lev(h,c)<=2||brand.length>=4&&h.indexOf(brand)>-1||brand.length>=5&&h.split('.').some(function(l){return lev(l,brand)<=1})})[0];
if(near)return say('bad','Looks like '+near.project+'\u2019s claim domain, but it is not',['The domain we list is '+near.claimDomain+'. '+h+' is different. Unless the project\u2019s official site or X account gave you this exact address, treat it as a fake and do not visit.']);
say('warn','Not in our list',[NOTSAFE,'Find the claim domain on the project\u2019s official site or official X account, then type it yourself.'])}
f.addEventListener('submit',run)})();
