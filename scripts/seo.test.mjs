import test from 'node:test';
import assert from 'node:assert/strict';
import { seoForPath, injectSeo } from '../helper/siteSeo.js';
test('public pages use the Codebricket canonical domain',()=>{for(const route of ['/','/service','/categories','/learn/technology','/exam-roadmap','/practice-quiz']){const seo=seoForPath(route);assert.equal(seo.canonical,'https://codebricket.com'+route);assert.equal(seo.robots,'index,follow');}});
test('account and unknown routes cannot be indexed',()=>{for(const route of ['/login','/dashboard/admin','/sourcecode-order','/sourcecode/buy/123','/success/123','/missing'])assert.equal(seoForPath(route).robots,'noindex,follow');assert.equal(seoForPath('/missing').found,false);});
test('HTML metadata replaces old tags and escapes user-controlled values',()=>{const result=injectSeo('<html><head><title>PDF Baba</title><meta name="description" content="old"/><link rel="canonical" href="https://pdf-baba.com"/></head></html>',{...seoForPath('/service'),title:'<script>unsafe</script>',description:'quoted "text" & more'});assert.equal((result.match(/<title>/g)||[]).length,1);assert.equal((result.match(/rel="canonical"/g)||[]).length,1);assert.ok(!result.includes('pdf-baba.com'));assert.ok(result.includes('data-rh="true"'));assert.ok(result.includes('&lt;script&gt;'));assert.ok(result.includes('&quot;text&quot; &amp; more'));});

test('trailing slashes keep public metadata and a single canonical',()=>{assert.equal(seoForPath('/service/').canonical,'https://codebricket.com/service');assert.equal(seoForPath('/categories/').robots,'index,follow');});
