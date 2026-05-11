---
title: doctachefinale
draft: true
published: true
date: 2026-04-29 13:32:58
tags:
---
<svg width="100%" viewBox="0 0 680 660" role="img" xmlns="http://www.w3.org/2000/svg">
<title style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">Schéma réseau Cisco 2911 + Switch 2960</title>
<desc style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">Schéma réseau avec routeur Cisco 2911, switch 2960 et trois VLANs (Data, VoIP, Admin) cotée sio</desc>
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs>

<!-- INTERNET / CLOUD -->

<g onclick="sendPrompt('Comment fonctionne la connexion WAN vers internet ?')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
<ellipse cx="340" cy="50" rx="90" ry="30" stroke-width="0.5" style="fill:rgb(12, 68, 124);stroke:rgb(133, 183, 235);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="340" y="46" text-anchor="middle" dominant-baseline="central" style="fill:rgb(181, 212, 244);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">Internet</text>
<text x="340" y="62" text-anchor="middle" dominant-baseline="central" style="fill:rgb(133, 183, 235);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">100.114.38.254/32</text>
</g>

<!-- Lien WAN -->

<line x1="340" y1="80" x2="340" y2="138" stroke="#378ADD" stroke-width="1.5" marker-end="url(#arrow)" fill="none" style="fill:none;stroke:rgb(55, 138, 221);color:rgb(251, 251, 254);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="355" y="114" fill="#185FA5" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">GE0/0</text>

<!-- ROUTEUR 2911 -->

<g onclick="sendPrompt('Détaille la configuration du routeur Cisco 2911')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
<rect x="220" y="138" width="240" height="64" rx="8" stroke-width="0.5" style="fill:rgb(68, 68, 65);stroke:rgb(180, 178, 169);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="340" y="162" text-anchor="middle" dominant-baseline="central" style="fill:rgb(211, 209, 199);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">routeur Cisco 2911</text>
<text x="340" y="182" text-anchor="middle" dominant-baseline="central" style="fill:rgb(180, 178, 169);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">Routeur — Router-on-a-stick</text>
</g>

<!-- Sous-interfaces routeur (légende droite) -->

<line x1="460" y1="155" x2="540" y2="155" stroke="#888780" stroke-width="0.5" stroke-dasharray="4 3" fill="none" style="fill:none;stroke:rgb(136, 135, 128);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-dasharray:4px, 3px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="545" y="159" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">GE0/1.10 — 192.168.100.1</text>
<line x1="460" y1="172" x2="540" y2="172" stroke="#888780" stroke-width="0.5" stroke-dasharray="4 3" fill="none" style="fill:none;stroke:rgb(136, 135, 128);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-dasharray:4px, 3px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="545" y="176" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">GE0/1.20 — 10.0.20.1</text>
<line x1="460" y1="189" x2="540" y2="189" stroke="#888780" stroke-width="0.5" stroke-dasharray="4 3" fill="none" style="fill:none;stroke:rgb(136, 135, 128);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-dasharray:4px, 3px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="545" y="193" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">GE0/1.99 — 10.0.0.1</text>

<!-- Lien trunk routeur → switch -->

<line x1="340" y1="202" x2="340" y2="268" stroke="#5F5E5A" stroke-width="2" marker-end="url(#arrow)" fill="none" style="fill:none;stroke:rgb(95, 94, 90);color:rgb(251, 251, 254);stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="348" y="232" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">GE0/1</text>
<text x="348" y="246" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">Trunk dot1q</text>
<text x="210" y="232" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">VLAN 10,20,99</text>

<!-- SWITCH 2960 -->

<g onclick="sendPrompt('Détaille la configuration du switch Cisco 2960')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
<rect x="200" y="268" width="280" height="64" rx="8" stroke-width="0.5" style="fill:rgb(68, 68, 65);stroke:rgb(180, 178, 169);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="340" y="292" text-anchor="middle" dominant-baseline="central" style="fill:rgb(211, 209, 199);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">switch Cisco 2960 — 24 ports</text>
<text x="340" y="312" text-anchor="middle" dominant-baseline="central" style="fill:rgb(180, 178, 169);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">Mgmt 10.0.0.2 (VLAN 99) — Fa0/24 trunk</text>
</g>

<!-- Trois branches VLANs -->

<!-- VLAN 10 Data -->

<line x1="240" y1="332" x2="140" y2="410" stroke="#639922" stroke-width="1.5" marker-end="url(#arrow)" fill="none" style="fill:none;stroke:rgb(99, 153, 34);color:rgb(251, 251, 254);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="148" y="372" text-anchor="middle" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">Fa0/1–20</text>

<g onclick="sendPrompt('Quel adressage pour le VLAN 10 Data ?')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
<rect x="50" y="410" width="180" height="66" rx="8" stroke-width="0.5" style="fill:rgb(39, 80, 10);stroke:rgb(151, 196, 89);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="140" y="434" text-anchor="middle" dominant-baseline="central" style="fill:rgb(192, 221, 151);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">VLAN 10 — compta</text>
<text x="140" y="452" text-anchor="middle" dominant-baseline="central" style="fill:rgb(151, 196, 89);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">192.168.100.0/24</text>
<text x="140" y="466" text-anchor="middle" dominant-baseline="central" style="fill:rgb(151, 196, 89);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">GW 192.168.100.1</text>
</g>

<!-- Postes clients VLAN 10 -->

<line x1="140" y1="476" x2="140" y2="530" stroke="#3B6D11" stroke-width="1" marker-end="url(#arrow)" fill="none" style="fill:none;stroke:rgb(59, 109, 17);color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<g onclick="sendPrompt('Quels équipements sur le VLAN Data ?')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
  <rect x="60" y="530" width="160" height="44" rx="8" stroke-width="0.5" style="fill:rgb(8, 80, 65);stroke:rgb(93, 202, 165);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="140" y="548" text-anchor="middle" dominant-baseline="central" style="fill:rgb(159, 225, 203);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">Postes compta</text>
  <text x="140" y="564" text-anchor="middle" dominant-baseline="central" style="fill:rgb(93, 202, 165);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">Fa0/1 à Fa0/20</text>
</g>

<!-- VLAN 20 VoIP -->

<line x1="340" y1="332" x2="340" y2="410" stroke="#BA7517" stroke-width="1.5" marker-end="url(#arrow)" fill="none" style="fill:none;stroke:rgb(186, 117, 23);color:rgb(251, 251, 254);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="356" y="372" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">Fa0/21–23</text>

<g onclick="sendPrompt('Quel adressage pour le VLAN 20 VoIP ?')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
<rect x="250" y="410" width="180" height="66" rx="8" stroke-width="0.5" style="fill:rgb(99, 56, 6);stroke:rgb(239, 159, 39);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="340" y="434" text-anchor="middle" dominant-baseline="central" style="fill:rgb(250, 199, 117);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">VLAN 20 — VoIP</text>
<text x="340" y="452" text-anchor="middle" dominant-baseline="central" style="fill:rgb(239, 159, 39);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">10.0.20.0/24</text>
<text x="340" y="466" text-anchor="middle" dominant-baseline="central" style="fill:rgb(239, 159, 39);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">GW 10.0.20.1</text>
</g>

<!-- Téléphones VLAN 20 -->

<line x1="340" y1="476" x2="340" y2="530" stroke="#854F0B" stroke-width="1" marker-end="url(#arrow)" fill="none" style="fill:none;stroke:rgb(133, 79, 11);color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<g onclick="sendPrompt('Quels équipements sur le VLAN VoIP ?')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
  <rect x="260" y="530" width="160" height="44" rx="8" stroke-width="0.5" style="fill:rgb(8, 80, 65);stroke:rgb(93, 202, 165);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="340" y="548" text-anchor="middle" dominant-baseline="central" style="fill:rgb(159, 225, 203);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">Téléphones IP</text>
  <text x="340" y="564" text-anchor="middle" dominant-baseline="central" style="fill:rgb(93, 202, 165);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">Fa0/21 à Fa0/23</text>
</g>

<!-- VLAN 99 Admin -->

<line x1="440" y1="332" x2="540" y2="410" stroke="#534AB7" stroke-width="1.5" marker-end="url(#arrow)" fill="none" style="fill:none;stroke:rgb(83, 74, 183);color:rgb(251, 251, 254);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="522" y="372" text-anchor="middle" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">VLAN 99</text>

<g onclick="sendPrompt('Quel adressage pour le VLAN 99 Admin ?')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
<rect x="450" y="410" width="180" height="66" rx="8" stroke-width="0.5" style="fill:rgb(60, 52, 137);stroke:rgb(175, 169, 236);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="540" y="434" text-anchor="middle" dominant-baseline="central" style="fill:rgb(206, 203, 246);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">VLAN 99 — Admin</text>
<text x="540" y="452" text-anchor="middle" dominant-baseline="central" style="fill:rgb(175, 169, 236);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">10.0.0.0/24</text>
<text x="540" y="466" text-anchor="middle" dominant-baseline="central" style="fill:rgb(175, 169, 236);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">GW 10.0.0.1</text>
</g>

<!-- Mgmt VLAN 99 -->

<line x1="540" y1="476" x2="540" y2="530" stroke="#3C3489" stroke-width="1" marker-end="url(#arrow)" fill="none" style="fill:none;stroke:rgb(60, 52, 137);color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<g onclick="sendPrompt('Comment accéder au switch en SSH ?')" style="fill:rgb(0, 0, 0);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
  <rect x="460" y="530" width="160" height="44" rx="8" stroke-width="0.5" style="fill:rgb(8, 80, 65);stroke:rgb(93, 202, 165);color:rgb(251, 251, 254);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="540" y="548" text-anchor="middle" dominant-baseline="central" style="fill:rgb(159, 225, 203);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">Poste admin</text>
  <text x="540" y="564" text-anchor="middle" dominant-baseline="central" style="fill:rgb(93, 202, 165);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">Accès mgmt switch</text>
</g>

<!-- Légende -->

<rect x="40" y="620" width="10" height="4" rx="1" fill="#639922" style="fill:rgb(99, 153, 34);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="56" y="626" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">VLAN 10 compta</text>
<rect x="160" y="620" width="10" height="4" rx="1" fill="#BA7517" style="fill:rgb(186, 117, 23);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="176" y="626" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">VLAN 20 VoIP</text>
<rect x="280" y="620" width="10" height="4" rx="1" fill="#534AB7" style="fill:rgb(83, 74, 183);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="296" y="626" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">VLAN 99 Admin</text>
<rect x="400" y="620" width="10" height="4" rx="1" fill="#5F5E5A" style="fill:rgb(95, 94, 90);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
<text x="416" y="626" style="fill:rgb(194, 192, 182);stroke:none;color:rgb(251, 251, 254);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">Lien trunk dot1q</text>
</svg>

<svg width="100%" viewBox="0 0 1200 864" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#fdfdfd" />
    <text x="50" y="45" font-family="Arial" font-size="24" font-weight="bold" fill="#2c3e50">Full Infrastructure Map - GSB7</text>
    <text x="50" y="80" font-family="Arial" font-size="14" fill="#7f8c8d">Cartographie exhaustive AD & Réseau - 07/05/2026 15:54:54</text>
    <text x="50" y="110" font-family="Arial" font-size="16" font-weight="bold" fill="#34495e">Structure Active Directory (Case-Insensitive Root)</text>
    <text x="650" y="110" font-family="Arial" font-size="16" font-weight="bold" fill="#34495e">Topologie Réseau & Voisins</text>
    <line x1="600" y1="100" x2="600" y2="814" stroke="#eee" stroke-width="2" />
    <g transform="translate(50, 120)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#3498db" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">📁 GSB7</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">domainDNS</text>
        </g>
    <g transform="translate(75, 148)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#3498db" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">📁 compte</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">organizationalUnit</text>
        </g>
    <g transform="translate(100, 176)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#3498db" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">📁 administratiff</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">organizationalUnit</text>
        </g>
    <g transform="translate(125, 204)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 Emma Tuvu</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(125, 232)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 pierre Rucar</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(100, 260)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#3498db" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">📁 employee</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">organizationalUnit</text>
        </g>
    <g transform="translate(125, 288)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 Francois FD. Duster</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(125, 316)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 Jaqueline JA. alexis</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(125, 344)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 Jean Tour</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(100, 372)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#9b59b6" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">💻 PC-WIN10</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">computer</text>
        </g>
    <g transform="translate(75, 400)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#3498db" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">📁 Domain Controllers</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">organizationalUnit</text>
        </g>
    <g transform="translate(100, 428)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#9b59b6" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">💻 WIN-IOE0CO5KDID</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">computer</text>
        </g>
    <g transform="translate(100, 456)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#9b59b6" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">💻 WIN-JAQAE0ITI7S</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">computer</text>
        </g>
    <g transform="translate(75, 484)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#f1c40f" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">📦 Computers</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">container</text>
        </g>
    <g transform="translate(100, 512)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#9b59b6" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">💻 DESKTOP-JEH9S4Q</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">computer</text>
        </g>
    <g transform="translate(100, 540)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#9b59b6" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">💻 MASTER</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">computer</text>
        </g>
    <g transform="translate(100, 568)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#9b59b6" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">💻 test</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">computer</text>
        </g>
    <g transform="translate(75, 596)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#f1c40f" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">📦 Users</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">container</text>
        </g>
    <g transform="translate(100, 624)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 Administrateur</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(100, 652)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 Invit�</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(100, 680)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 user1</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(100, 708)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 user2</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <g transform="translate(100, 736)">
            <rect width="260" height="25" rx="3" fill="white" stroke="#2ecc71" stroke-width="1.5" />
            <text x="5" y="17" font-family="Arial" font-size="11" fill="#2c3e50">👤 user3</text>
            <text x="255" y="17" font-family="Arial" font-size="8" fill="#95a5a6" text-anchor="end">user</text>
        </g>
    <circle cx="750" cy="150" r="45" fill="#e67e22" stroke="white" stroke-width="2" />
    <text x="750" y="150" font-family="Arial" font-size="12" fill="white" text-anchor="middle" font-weight="bold">WIN-IOE0CO5KDID</text>
    <text x="750" y="165" font-family="Arial" font-size="9" fill="white" text-anchor="middle">192.168.0.5</text>
    <line x1="750" y1="150" x2="750" y2="230" stroke="#bdc3c7" stroke-dasharray="4" />
        <g transform="translate(650, 230)">
            <rect width="280" height="35" rx="5" fill="#ecf0f1" stroke="#95a5a6" opacity="0.9" />
            <text x="140" y="15" font-family="Arial" font-size="11" fill="#2c3e50" text-anchor="middle" font-weight="bold">192.168.0.6</text>
            <text x="140" y="28" font-family="Arial" font-size="9" fill="#7f8c8d" text-anchor="middle">MAC: 00-50-56-8f-57-3d</text>
        </g>
    <line x1="750" y1="150" x2="750" y2="275" stroke="#bdc3c7" stroke-dasharray="4" />
        <g transform="translate(650, 275)">
            <rect width="280" height="35" rx="5" fill="#ecf0f1" stroke="#95a5a6" opacity="0.9" />
            <text x="140" y="15" font-family="Arial" font-size="11" fill="#2c3e50" text-anchor="middle" font-weight="bold">192.168.0.9</text>
            <text x="140" y="28" font-family="Arial" font-size="9" fill="#7f8c8d" text-anchor="middle">MAC: 00-50-56-8f-a4-6a</text>
        </g>
    <line x1="750" y1="150" x2="750" y2="320" stroke="#bdc3c7" stroke-dasharray="4" />
        <g transform="translate(650, 320)">
            <rect width="280" height="35" rx="5" fill="#ecf0f1" stroke="#95a5a6" opacity="0.9" />
            <text x="140" y="15" font-family="Arial" font-size="11" fill="#2c3e50" text-anchor="middle" font-weight="bold">192.168.0.220</text>
            <text x="140" y="28" font-family="Arial" font-size="9" fill="#7f8c8d" text-anchor="middle">MAC: 00-50-56-8f-6c-1a</text>
        </g>
    <line x1="750" y1="150" x2="750" y2="365" stroke="#bdc3c7" stroke-dasharray="4" />
        <g transform="translate(650, 365)">
            <rect width="280" height="35" rx="5" fill="#ecf0f1" stroke="#95a5a6" opacity="0.9" />
            <text x="140" y="15" font-family="Arial" font-size="11" fill="#2c3e50" text-anchor="middle" font-weight="bold">100.114.38.170</text>
            <text x="140" y="28" font-family="Arial" font-size="9" fill="#7f8c8d" text-anchor="middle">MAC: N/A (External/VPN)</text>
        </g>
    <line x1="750" y1="150" x2="750" y2="410" stroke="#bdc3c7" stroke-dasharray="4" />
        <g transform="translate(650, 410)">
            <rect width="280" height="35" rx="5" fill="#ecf0f1" stroke="#95a5a6" opacity="0.9" />
            <text x="140" y="15" font-family="Arial" font-size="11" fill="#2c3e50" text-anchor="middle" font-weight="bold">100.114.38.254</text>
            <text x="140" y="28" font-family="Arial" font-size="9" fill="#7f8c8d" text-anchor="middle">MAC: N/A (External/VPN)</text>
        </g>
</svg>

![capture.png](/images/capture.png)

