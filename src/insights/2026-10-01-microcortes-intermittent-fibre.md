---
title: "Microcortes: proving an intermittent fibre fault"
date: 2026-10-01
author: Rufus
tags: [linemon, fibre, networking, isp]
---

# Microcortes: proving an intermittent fibre fault

A 1 Gbps home fibre line in Spain started dropping out many times a day. Support saw nothing. Reboots changed nothing. A technician found nothing. Two weeks of router logs, a screenshot from the operator's own box, and a Raspberry Pi turned "it keeps cutting out" into timestamped evidence of where the fault sits.

The monitor built for that work is now open source: [linemon](https://github.com/johanhellman/linemon).

## The numbers

From 16 September to 1 October the UniFi Dream Machine Pro's WAN monitor logged 209 outages and 2 hours 15 minutes offline. The longest single cut was 24 minutes, at 02:18 on 1 October. Before 16 September the same log showed one to three outages a month.

| Day | Outages |
| --- | ---: |
| 16 Sep | 13 |
| 17 Sep | 10 |
| 18 Sep | 7 |
| 19 Sep | 0 |
| 20 Sep | 0 |
| 21 Sep | 1 |
| 22 Sep | 12 |
| 23 Sep | 0 |
| 24 Sep | 0 |
| 25 Sep | 49 |
| 26 Sep | 25 |
| 27 Sep | 8 |
| 28 Sep | 0 |
| 29 Sep | 15 |
| 30 Sep | 40 |
| 1 Oct | 29 |

25 and 26 September are the days the ISP worked on the line remotely (firmware update, reboots). 1 October runs until 12:49, when the last log was exported. The UDM's own restarts on 29 September are excluded.

The line is Pepephone (MasOrange). The home network is a UDM Pro behind the operator's router, first a ZTE H3640, then a Livebox 6s. That means double NAT, and the operator also uses CGNAT. None of this caused the outages. It did shape how they could be measured: the UDM's internet-facing address is private, so its log is a view from behind the ISP box, not from the fibre itself.

## What happened

On 16 September the short cuts started: seconds to a few minutes, many times a day.

The first support request went in on 25 September with exact times from the UDM log instead of "multiple outages". The operator pushed a firmware update to its router. The log shows the reboot to the second. The next outage was 22 minutes later. That day had 49 cuts.

The next day the ticket was closed as "resolved remotely", with advice to reboot the router. 23 more outages followed.

On 27 September the ISP router's own status page showed its WAN connection up for 49 hours straight, while the UDM logged 38 outages. The fault was beyond the router, not in it.

A WhatsApp follow-up never became a ticket, so the whole script started again. A new ticket went in under "loss of sync", after one more mandatory reboot. The ISP gave 50 GB of mobile data a day as a stopgap, and work moved to a phone hotspot.

On the morning of 1 October the line was down for 24 minutes while the cable to the router stayed up. Logs and a one-page summary went to the visiting technician. Optical power measured about −21 dBm, which is normal. The technician swapped the ONT and router for a Livebox 6s, with the ONT built in. A short outage happened while they were packing up.

At 17:06, during another cut, the Livebox diagnostic page showed the fibre registered and optical power normal, but no IP address. The physical fibre was fine. The fault was in the layer that gives the line its address and route.

That evening a Raspberry Pi 4 started monitoring the line on its own cable into the Livebox, independent of the UDM Pro.

## How the evidence was built

The UDM Pro's support export includes the WAN failover monitor: pings and DNS checks to 1.1.1.1 and 8.8.8.8. Pairing every "down" with its "up" gave start, end and duration of each outage, plus kernel link events for when the ISP router rebooted.

Each update to the ISP led with counts and the longest outages, answered the usual script (reboot, Wi-Fi or cable, photo of the lights) before it was asked, and asked for a ticket number in writing.

The operator's own equipment confirmed the same cuts: the ZTE status page (WAN uptime, CGNAT address) and later the Livebox LEDs and diagnostic page.

A Pi wired straight into the ISP router removes "it's your router". Probing each layer separately shows where the path breaks, not only that it did.

## linemon

[github.com/johanhellman/linemon](https://github.com/johanhellman/linemon). MIT licence. Python standard library plus `ping`. systemd. Tested on a Pi 4 running Raspberry Pi OS Bookworm.

Once a second, each layer is probed on the wired port only:

- cable: the monitor's own Ethernet carrier
- ISP router: ping to the default gateway
- hop 1 and hop 2: the first two routers inside the operator network that answer, found the way traceroute does it (a ping with a limited time-to-live, answered with "time to live exceeded"), discovered automatically and re-checked hourly
- internet: ping Cloudflare, Google and Quad9; it only counts as an internet outage when all three fail at once
- DNS: a lookup of a random name, so no cache can answer, via the router and directly to 1.1.1.1

A target is down after three failed probes in a row, timed from the first failure. Each outage is written and synced to disk when it starts, so it survives a crash or a power cut. Each internet outage is labelled with the first layer that also failed, for example "first ISP hop unreachable (access network)".

The analyzer summarises per target, per day and per layer, exports CSV, and can match the monitor against a UniFi gateway's WAN log. The Pi also serves a read-only status page on port 8080.

Install it anywhere, then move the cable: it detects the new router and remaps the path. Upgrades do not interrupt measurements. Wi-Fi was turned off on the Pi so nobody can argue the traffic took another route.

Built in one session with Claude Code. The probes were unit-tested against real ping output and real UDM logs. The analyzer was checked against synthetic outages. The page was tested in a browser before it went on the Pi.

## Where it stands

The ticket is escalated. The line is still dropping out after the technician's visit.

The Livebox screenshot moved the likely fault from the physical fibre to the IP layer: address assignment, or the operator network beyond the fibre. That matters because the ISP was about to escalate to the fibre owner, Movistar.

The Pi is collecting a few days of independent data, to be matched against the UDM Pro log before the next round with support.

## What the two weeks taught

Timestamps beat adjectives. "209 outages, 2 h 15 min offline, longest 24 minutes" gets a different response than "it keeps cutting out".

A technician measuring for half an hour saw a healthy line. The logs showed dozens of outages a day. Intermittent faults do not care about spot checks.

Four reboots, logged to the second, did nothing. Showing that removes the standard answer.

A detailed follow-up sat unanswered for days because no ticket was ever opened. Get the number in writing.

"Is it the fibre or the network behind it?" decides which company has to fix it. Separate the layers.

The UDM Pro's support export already held two weeks of second-level evidence. Most of this work was reading a log that was already there.
