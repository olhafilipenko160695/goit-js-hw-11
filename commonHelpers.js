import{S as a,i as c}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const u=document.querySelector("#searchForm"),d=document.querySelector("#gallery"),f=document.querySelector(".loader");new a(".simplelightbox-gallery");u.addEventListener("submit",b);const h=document.getElementById("searchInput"),p=new a(".gallery a");function y(n){const s=`https://pixabay.com/api/?key=41990967-a01a4811db23696ec0b17c82e&q=${n}&image_type=photo&orientation=horizontal&safesearch=${!0}`;fetch(s).then(o=>{if(!o.ok)throw new Error(o.statusText);return o.json()}).then(o=>{o.hits.length===0?c.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!"}):g(o.hits)}).catch(o=>{E()}).finally(()=>f.style.display="none")}function b(n){n.preventDefault();const t=h.value.trim();d.innerHTML="",t!==""&&(f.style.display="block",y(t),u.reset())}function g(n){const t=n.map(({webformatURL:i,largeImageURL:l,tags:e,likes:r,views:s,comments:o,downloads:m})=>`<li class="card">
    <a href="${l}"><img src="${i}" alt="${e}" class="image" />
        <ul class="item-list">
          <li class="block">
            <p><b >Likes</b><br> ${r}</p>
          </li>
          <li class="block">
           <p><b>Views</b><br> ${s}</p>
          </li >
          <li class="block">
            <p><b>Comments</b><br> ${o}</p>
          </li>
          <li class="block">
            <p><b>Downloads</b><br> ${m}</p>
          </li>
        </ul>
    </a>
        
      </li>`).join("");d.insertAdjacentHTML("beforeend",t),p.refresh()}function E(n){c.error({title:"Error",message:"An error occurred. Please try again later."})}
//# sourceMappingURL=commonHelpers.js.map
