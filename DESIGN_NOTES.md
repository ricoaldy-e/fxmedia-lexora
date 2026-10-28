# Lexora design inspection and asset preparation

Inspected 28 October 2026. This phase contains assets and design notes only. Existing application source, styles, dependencies, configuration, README, gitignore, and lockfile are unchanged.

Source: [Web Test Case — Copy](https://www.figma.com/design/wdtUQOUkUqB4Mfqh8TbRr3/Web-Test-Case--Copy-), Page 1 (`0:1`).

## Frames and inspection coverage

| Frame | Node | Width × height |
| --- | --- | --- |
| Homepage | `20:2` | 1440 × 5602 |
| Navigation Menu | `20:254` | 1440 × 900 |
| Homepage Mobile | `20:547` | 402 × 5602 |
| Nav mobile | `20:774` | 402 × 874 |

All four frames were read using Figma design context, including their screenshots. Read-only Plugin API traversals inspected 840 nodes across the four frame subtrees, including nested text, image fills, vectors, masks, hidden layers, typography, colors, positions, sizes, and image hashes. Visibility flags do not imply a layer is unobscured or inside its clipping frame: the navigation frames also contain homepage layers beneath the overlays.

Relevant nested layers include desktop hero `20:8`, `20:12`, `20:16–17`, `20:19`, `20:27–28`, `20:245`; introduction `20:111–116`; service tiles `20:72`; anniversary `20:48`, `20:56`; timeline `20:118–128`; legal support `20:129`; press cards `20:163–193`; career `20:194–222`; footer `20:223`; desktop menu `20:500–546`. Mobile equivalents include hero `20:570–604`, introduction `20:605–608`, services `20:558–569`, `20:609–630`, anniversary `20:631–650`, timeline `20:550–557`, `20:651–657`, support `20:658–685`, press `20:702–725`, career `20:726–757`, footer `20:758–773`, and menu `20:809–841`.

## Homepage order and desktop/mobile composition

Coordinates below are local to their respective homepage frame. Bands describe the observed composition; overlapping torn paper and illustrations extend across these bands.

| Order | Section and content | Desktop measurements | Mobile measurements |
| --- | --- | --- | --- |
| 1 | Hero: logo, social/contact links, menu/scroll rail, “Become an affiliate of the Lexora”, description, Find Lawyer CTA, Marina Bay, Lady Justice and burgundy ribbon | Hero 1440 × 900; rail x=1312, w=128; logo x=60/y=60, 152.46 × 62; hero copy x=673/y=256, w=586; statue bounding box x=55/y=-16, 598 × 916 | Hero 402 × 874; rail x=297, w=105; logo x=30/y=30, 162.30 × 66; copy x≈28–46/y=132; statue x=-13/y=420, 296.39 × 454; social/contact links move into open menu |
| 2 | What We Do: quotation mark, “We carry out various statutory functions”, mission and Read more | Background begins around y=900; label x=254/y=1017; title y=1068; body x=254/y=1163, w=974 | Label x=81/y=930; title y=971, w=262; body x=81/y=1063, w=272; lower edge around y=1284 |
| 3 | Four service tiles: 01 Firm Closure Dates, 02 Pro Bono Services, 03 Members’ Library, 04 Specialists Directory | y=1351–1801; four columns of 360; image/title area h=356 and CTA strip h=94. Pro Bono has a dark selected/hover-like appearance with gold strip and extra description | y=1284–1748; 2 × 2 arrangement, row-major order 01/02 then 03/04; columns ≈201–202; image/title area h=182 plus 50 CTA strip; all four use neutral treatment |
| 4 | Celebrating 60th anniversary: delegation photograph, text on burgundy ribbon, Play video | Main backdrop y=1801, h=692; central composition x=231/y=1975, w=932; text runs horizontally around the large 60; play disc 60 × 60 at x=690/y=2227 | Backdrop y=1748, h=855; “Celebrating”, 60th ribbon, then “anniversary” stack vertically; ribbon x=29/y=2060, 344.5 × 90; play disc x=171/y=2286; torn paper extends below |
| 5 | Road to 2027: “Celebrating a Legacy, Journeying to the Future”, years 2025/2026/2027, legal meeting image, headline and paragraph | Label y=2575; heading y=2626; divider y=2836; years x=950/1110/1271 at y=2866; image x=60/y=2886, 649 × 400; copy x=759/y=3089–3286, w=583 | Label y=2650, heading y=2692; divider y=2814; years row x=30/y=2839, w=342; image x=29/y=2926, 343 × 211; headline y=3187 and body y=3256–3456, w=342 |
| 6 | Legal Support: “guiding you through every steps”; four links and Explore more support | Heading row x=60/y=3386, w=1320; list x=202/y=3513, w=1026; rows h=60 with 30 vertical gaps; category w=105, gap=30, link w=891; CTA y=3923 | Label y=3530 then heading y=3569; list x=29/y=3691, w=343; category w=75, gap=15, link w=253; rows h=50 with 20 gaps; CTA y=4001 |
| 7 | Media & press: Inner Temple MOU, Hunan delegation, Lawyers & Students dialogue | Label y=4175; image row y=4261, ≈486 × 300 per image; text starts y=4611; card width≈485 and gap≈50; third card extends past right edge, indicating horizontal overflow | Label y=4165; first image x=29/y=4219, 269 × 164.07; text y=4413; second card begins x=312.74, leaving a partial preview; gap≈14.74; no third mobile card layer |
| 8 | Career support: briefcase, “Support for your career growth”, description, Find career, phone cutout with screen and three badges | Banner y=5052–5252; text/icon x=126/y=5097; phone illustration starts x=909/y=4897 and overlaps above banner; badges 48 × 48 | Banner y=4729–5244; text group x=66/y=4766; phone group x=62/y=4889; image below copy, with overlap; badges retain 48 × 48 |
| 9 | Footer: logo; FAQs, Advertising Rates, Terms of use, Privacy policy; copyright and last update | y=5252–5602; h=350; centered logo/link row; bottom divider y=5522; copyright and update sit on opposite sides at y=5548 | y=5244–5602; h=358; logo 221 × 90 at y=5270; links wrap into two centered rows at y=5390/5425; divider y=5480; centered copyright/update stack |

Desktop generally uses 60 px outer content margins (1320 px content width); mobile generally uses 29–30 px margins (342–343 px content width). The mobile footer and career surface measure 403 px inside a 402 px frame, so a later implementation should account for the observed 1 px overflow instead of assuming every layer fits exactly.

The four legal support rows, in order, are Feedback on Law Reforms; Alternative Dispute Resolution Schemes; Members’ Support Schemes; Future Lawyering Research Portal. Categories are Lawyer, Public, Lawyer, Lawyer.

## Navigation

Desktop overlay `20:501` starts at x=310 and measures 1130 × 900, leaving 310 px of the dimmed/blurred homepage visible. Its charcoal surface is `20:503`; backdrop `20:500` uses black at 30% with 5 px backdrop blur. Close icon `20:504` is 24 × 24 at frame-local x=1365/y=79. Social/contact group sits at x=1007/y=76. Search starts x=394/y=158, with an 848 px underline at y=197. Main labels start x=394/y=261 with 59 px vertical increments. Secondary links start x=741/y=273 with 40 px increments. The scales image uses 30% opacity and multiply blend.

Mobile overlay fills 402 × 874. Social/contact group is x=28/y=48, close icon 24 × 24 at x=337/y=51, search x=29/y=128 with 344 px underline at y=166. Main labels start x=28/y=216, with 59 px increments. Scales image bounds are x=-175/y=228, 577 × 646, clipped by the frame. Only the primary list is shown; mobile secondary navigation behavior is not specified by a supplied frame.

Primary menu order: About us; Lawyers; Public; Admissions; Media; CPD; Member login; Membership; Careers; Advertise. About us is gold and underlined in both open-menu frames; other entries are off-white.

Desktop About us submenu order: What We Do; Council 2025; Executive Committee 2025; Presidents & Honorary Members; Award Recipients; Secretariat 2025; Standing Committees 2025; Practice Areas; Support Schemes; Membership Privileges.

## Typography

Actual layer families/styles: **Oswald Regular 400**, **Oswald Medium 500**, **Montserrat Regular 400**, **Montserrat SemiBold 600**. Many headings, section labels, links and navigation entries use uppercase text case. No font binaries were supplied by Figma asset exports; no font files were downloaded or installed.

| Role | Desktop | Mobile |
| --- | --- | --- |
| Hero heading | Oswald Medium 72 px | Oswald Medium 36 px |
| Intro / Road headline | Oswald Regular 54 px | Oswald Regular 24 px |
| Section labels | Oswald Regular 24 px | Usually 16 px; Road label 18 px |
| Service titles | Oswald Regular 26 px | Oswald Regular 18 px |
| Anniversary side words / number | Oswald Regular 54 / 150 px; “th” 42 px | 32 / 100 px; “th” 32 px |
| Year tabs | Oswald Medium 54 px | Oswald Medium 42 px |
| Legal support headline / press title | Oswald Regular 32 px | Oswald Regular 24 px |
| Body | Montserrat Regular 18 px / 30 px line height | Intro/timeline 16 / 25; hero 16 / 30 with clipped 89 px body box |
| CTA | Montserrat SemiBold 18 / 30, 1% tracking | Often same; career CTA 16 / 30 |
| Open menu primary / secondary | Oswald Regular 30 px / Montserrat Regular 16 px | Primary Oswald Regular 30 px; secondary not shown |
| Search | Montserrat Regular 18 px, 130% line height | Same |
| Scroll / play captions | Montserrat Regular 12 / 15, 1% tracking | Same |
| Copyright | Montserrat Regular 14 / 30 | 12 / 20; update 12 / 30 |

Oswald heading line heights are recorded as AUTO in Figma, not an explicit pixel line height. Text line breaks and box widths should be preserved before determining flexible layout behavior.

## Colors, image treatment, and decorative geometry

| Color | Observed use |
| --- | --- |
| `#AA0433` | Main burgundy: labels, ribbon, accent artwork |
| `#760525` | Dark burgundy on hero ribbon |
| `#927642` | Gold: links, selected year/menu item, icons, selected service CTA, video disc |
| `#252527` | Main dark text / dark image overlay |
| `#404040` | Navigation, hero rail, anniversary base, footer |
| `#F9F9F9` | Page/paper surfaces |
| `#FAFAFA`, `#FFFFFF` | Off-white and white foregrounds |
| `#DEE2E6` | Muted backgrounds, photography overlays; often at 50–70% opacity |
| `#E5E8EB` | Neutral support rows |
| `#EBEDEF` | Footer text, with reduced opacity on bottom text |
| `#73695D` | Scroll-disc background |
| `#EB2517` | Red stop within multiply gradients |

Hero uses a 1 px image blur, pale overlay and red/burgundy multiply gradient. Desktop Lady Justice uses two copies of one source: normal plus a 30% color-dodge layer; it is horizontally flipped. Mobile moves the statue below the copy. Anniversary photography is monochrome at 30% over a dark base; the burgundy ribbon itself has 70% opacity. Light/grunge paper textures use 70% opacity; aged-paper layers use 90% and additional fading gradients. Career background photography uses 40% opacity.

Original photos are often colored while Figma-prepared image exports contain desaturation, contrast, or crop adjustments. Both originals and the distinct prepared variants are retained for these cases. Do not apply the same image adjustment twice. The desktop and mobile Pro Bono images differ in their tonal treatment, and the original Marina Bay photo is a warm sunset while both prepared hero images are monochrome.

Paper-edge PNGs are tall, narrow alpha/mask assets, not full-page backgrounds. They need the rotations/crops observed in Figma. The artwork is reused at several boundaries. `legal-paper-mask-mobile.svg` is a Figma-prepared decoration mask containing an embedded raster image; it is not a pure vector original. CTA arrow SVGs have downward-pointing intrinsic geometry; Figma rotates them -90° for rightward CTAs. Keep real text, layout, menu, buttons, rules, dots, and content structure as HTML/React in the implementation phase. Simple separators and year dots were measured but deliberately not copied as redundant image files.

## Downloaded assets

Saved **72 validated files** under `public/assets/`: **13 exact source originals**, **29 prepared raster exports**, and **30 SVGs** (29 vector exports plus one mask SVG containing embedded raster). Total: **61,323,057 bytes**. Originals retain their source resolution and bytes. There are no duplicate SHA-256 file contents. Color/prepared, desktop/mobile, and differently sized artwork variants are retained only where the Figma exports differ and correspond to distinct design uses.

An “original” was classified only when the downloaded file SHA-1 exactly matched an image hash read from a Figma layer. A prepared export is not claimed to be the original upload. Files were downloaded from Figma MCP-provided URLs with curl, validated in temporary storage, then copied into the repository. No stock or generated substitutes were used. No complete frame screenshot is present in `public/assets/`.

All paths below are local, relative to the repository root. Dimensions are the actual file dimensions, which can differ from the layer’s cropped/rotated design slot.

### Exact source originals

| Local file | Dimensions | Bytes | Figma layer IDs |
| --- | --- | ---: | --- |
| [career-phone-photo.jpg](public/assets/career-phone-photo.jpg) | 3031 × 4096 | 5,602,092 | `20:209`, `20:471`, `20:741` |
| [career-phone-cutout.png](public/assets/career-phone-cutout.png) | 3031 × 4096 | 6,579,372 | `20:209`, `20:471`, `20:741` |
| [paper-texture-aged.jpg](public/assets/paper-texture-aged.jpg) | 2891 × 4096 | 9,610,847 | `20:258`, `20:259`, `20:315`, `20:55`, `20:556`, `20:557`, `20:6`, `20:638`, `20:7` |
| [service-pro-bono-gavel.jpg](public/assets/service-pro-bono-gavel.jpg) | 719 × 479 | 33,497 | `20:333`, `20:565`, `20:73` |
| [service-members-library.jpg](public/assets/service-members-library.jpg) | 4096 × 2731 | 4,367,260 | `20:336`, `20:562`, `20:76` |
| [service-firm-closure-calendar.jpg](public/assets/service-firm-closure-calendar.jpg) | 4096 × 2731 | 5,993,617 | `20:334`, `20:559`, `20:74` |
| [hero-marina-bay.jpg](public/assets/hero-marina-bay.jpg) | 3400 × 2267 | 5,414,876 | `20:260`, `20:573`, `20:778`, `20:8` |
| [anniversary-delegation.png](public/assets/anniversary-delegation.png) | 2048 × 1153 | 2,766,217 | `20:311`, `20:51`, `20:634` |
| [lexora-logo.png](public/assets/lexora-logo.png) | 1536 × 1024 | 1,324,518 | `20:229`, `20:27`, `20:287`, `20:581`, `20:761` |
| [legacy-law-society-logo.png](public/assets/legacy-law-society-logo.png) | 300 × 122 | 24,814 | `20:488`, `20:785` |
| [news-hunan-delegation.png](public/assets/news-hunan-delegation.png) | 2048 × 1535 | 3,713,942 | `20:164`, `20:424`, `20:716` |
| [news-inner-temple-mou.png](public/assets/news-inner-temple-mou.png) | 1120 × 840 | 1,623,385 | `20:166`, `20:426`, `20:705` |
| [career-phone-screen.jpg](public/assets/career-phone-screen.jpg) | 1179 × 2556 | 452,671 | `20:211`, `20:473`, `20:743` |

### Prepared raster exports

| Local file | Dimensions | Bytes | Figma layer IDs |
| --- | --- | ---: | --- |
| [paper-texture-light-export.png](public/assets/paper-texture-light-export.png) | 1024 × 683 | 520,303 | `20:3`, `20:548` |
| [hero-lady-justice-export.png](public/assets/hero-lady-justice-export.png) | 1024 × 1024 | 803,603 | `20:16`, `20:17`, `20:587` |
| [service-specialists-directory-export.png](public/assets/service-specialists-directory-export.png) | 787 × 1024 | 479,605 | `20:75`, `20:568` |
| [road-to-2027-legal-meeting-export.png](public/assets/road-to-2027-legal-meeting-export.png) | 1024 × 683 | 962,453 | `20:125`, `20:655` |
| [news-lawyers-students-export.png](public/assets/news-lawyers-students-export.png) | 1024 × 473 | 286,374 | `20:165` |
| [career-office-background-export.png](public/assets/career-office-background-export.png) | 1024 × 683 | 344,279 | `20:195`, `20:728` |
| [navigation-scales-export.png](public/assets/navigation-scales-export.png) | 1024 × 684 | 174,461 | `20:506`, `20:825` |
| [hero-paper-edge-desktop.png](public/assets/hero-paper-edge-desktop.png) | 402 × 2880 | 433,047 | `20:42`, `20:43` |
| [hero-paper-angle-desktop.png](public/assets/hero-paper-angle-desktop.png) | 1600 × 2844 | 686,907 | `20:45`, `20:46` |
| [anniversary-paper-edge-desktop.png](public/assets/anniversary-paper-edge-desktop.png) | 470 × 2900 | 629,917 | `20:52`, `20:53` |
| [section-paper-edge.png](public/assets/section-paper-edge.png) | 442 × 2884 | 436,959 | `20:157`, `20:158`, `20:687` |
| [hero-paper-edge-mobile.png](public/assets/hero-paper-edge-mobile.png) | 253 × 1809 | 190,488 | `20:599`, `20:600` |
| [hero-paper-angle-mobile.png](public/assets/hero-paper-angle-mobile.png) | 1005 × 1786 | 292,166 | `20:602`, `20:603` |
| [anniversary-paper-edge-mobile.png](public/assets/anniversary-paper-edge-mobile.png) | 271 × 1671 | 228,266 | `20:635`, `20:636` |
| [hero-marina-bay-monochrome.png](public/assets/hero-marina-bay-monochrome.png) | 1024 × 683 | 369,687 | `20:8`, `20:573` |
| [hero-marina-bay-navigation-export.png](public/assets/hero-marina-bay-navigation-export.png) | 1024 × 683 | 357,679 | `20:260` |
| [service-calendar-monochrome.png](public/assets/service-calendar-monochrome.png) | 1024 × 683 | 280,684 | `20:74`, `20:559` |
| [service-pro-bono-desktop-export.png](public/assets/service-pro-bono-desktop-export.png) | 719 × 479 | 71,226 | `20:73` |
| [service-pro-bono-mobile-export.png](public/assets/service-pro-bono-mobile-export.png) | 719 × 479 | 128,386 | `20:565` |
| [service-members-library-desktop-export.png](public/assets/service-members-library-desktop-export.png) | 1024 × 683 | 690,652 | `20:76` |
| [service-members-library-mobile-export.png](public/assets/service-members-library-mobile-export.png) | 1024 × 683 | 703,956 | `20:562` |
| [anniversary-delegation-monochrome.png](public/assets/anniversary-delegation-monochrome.png) | 1024 × 577 | 488,972 | `20:51`, `20:634` |
| [career-phone-monochrome.png](public/assets/career-phone-monochrome.png) | 758 × 1024 | 250,394 | `20:209`, `20:741` |
| [paper-texture-aged-export.png](public/assets/paper-texture-aged-export.png) | 723 × 1024 | 448,582 | `20:6`, `20:556` |
| [intro-paper-texture-desktop-export.png](public/assets/intro-paper-texture-desktop-export.png) | 723 × 1024 | 426,567 | `20:7` |
| [intro-paper-texture-mobile-export.png](public/assets/intro-paper-texture-mobile-export.png) | 723 × 1024 | 459,898 | `20:557` |
| [paper-texture-light-mobile-export.png](public/assets/paper-texture-light-mobile-export.png) | 1024 × 683 | 494,006 | `20:548` |
| [legal-paper-texture-desktop-export.png](public/assets/legal-paper-texture-desktop-export.png) | 1024 × 683 | 522,023 | `20:241`, `20:244` |
| [legal-paper-texture-mobile-export.png](public/assets/legal-paper-texture-mobile-export.png) | 1024 × 683 | 499,720 | `20:701` |

### SVG artwork and icons

| Local file | Dimensions | Bytes | Figma layer IDs |
| --- | --- | ---: | --- |
| [hero-ribbon-desktop.svg](public/assets/hero-ribbon-desktop.svg) | 303.661 × 669.209 | 540 | `20:12` |
| [hero-ribbon-mobile.svg](public/assets/hero-ribbon-mobile.svg) | 178.423 × 393.209 | 533 | `20:583` |
| [menu-hamburger.svg](public/assets/menu-hamburger.svg) | 26 × 16 | 276 | `20:21`, `20:575` |
| [scroll-down.svg](public/assets/scroll-down.svg) | 20 × 20 | 343 | `20:24`, `20:578` |
| [social-facebook-gold.svg](public/assets/social-facebook-gold.svg) | 20 × 20 | 501 | `20:30` |
| [social-instagram-gold.svg](public/assets/social-instagram-gold.svg) | 16.5 × 16.5 | 1,278 | `20:33` |
| [social-linkedin-gold.svg](public/assets/social-linkedin-gold.svg) | 20 × 20 | 844 | `20:37` |
| [anniversary-ribbon-desktop.svg](public/assets/anniversary-ribbon-desktop.svg) | 932 × 90 | 265 | `20:62` |
| [video-play-disc.svg](public/assets/video-play-disc.svg) | 60 × 60 | 236 | `20:69`, `20:641` |
| [video-play-triangle.svg](public/assets/video-play-triangle.svg) | 26 × 16 | 233 | `20:70`, `20:642` |
| [arrow-offwhite.svg](public/assets/arrow-offwhite.svg) | 30.6825 × 45 | 453 | `20:81` |
| [arrow-charcoal.svg](public/assets/arrow-charcoal.svg) | 30.6825 × 45 | 453 | `20:93` |
| [arrow-gold.svg](public/assets/arrow-gold.svg) | 30.6825 × 45 | 453 | `20:252`, `20:595` |
| [paper-edge-accent.svg](public/assets/paper-edge-accent.svg) | 930.5 × 55 | 539 | `20:160`, `20:690` |
| [career-ribbon-desktop.svg](public/assets/career-ribbon-desktop.svg) | 758 × 200 | 263 | `20:196` |
| [career-briefcase-desktop.svg](public/assets/career-briefcase-desktop.svg) | 53 × 53 | 507 | `20:198` |
| [menu-close.svg](public/assets/menu-close.svg) | 24 × 24 | 500 | `20:504`, `20:810` |
| [social-facebook-light.svg](public/assets/social-facebook-light.svg) | 20 × 20 | 501 | `20:509`, `20:814` |
| [social-instagram-light.svg](public/assets/social-instagram-light.svg) | 16.5 × 16.5 | 1,278 | `20:512`, `20:817` |
| [social-linkedin-light.svg](public/assets/social-linkedin-light.svg) | 20 × 20 | 844 | `20:516`, `20:821` |
| [search-desktop.svg](public/assets/search-desktop.svg) | 17.779 × 17.8791 | 600 | `20:522` |
| [search-mobile.svg](public/assets/search-mobile.svg) | 11.3237 × 11.3875 | 743 | `20:828` |
| [anniversary-ribbon-mobile.svg](public/assets/anniversary-ribbon-mobile.svg) | 344.5 × 90 | 273 | `20:644` |
| [career-ribbon-mobile.svg](public/assets/career-ribbon-mobile.svg) | 592 × 146 | 263 | `20:729` |
| [career-briefcase-mobile.svg](public/assets/career-briefcase-mobile.svg) | 35 × 35 | 513 | `20:731` |
| [career-arrow-mobile.svg](public/assets/career-arrow-mobile.svg) | 12 × 27 | 420 | `20:738` |
| [career-badge-building.svg](public/assets/career-badge-building.svg) | 48 × 48 | 1,031 | `20:746` |
| [career-badge-courthouse.svg](public/assets/career-badge-courthouse.svg) | 48 × 48 | 604 | `20:750` |
| [career-badge-gavel.svg](public/assets/career-badge-gavel.svg) | 48 × 48 | 689 | `20:754` |
| [legal-paper-mask-mobile.svg](public/assets/legal-paper-mask-mobile.svg) | 1441.83 × 221 | 1,138,713 | `20:693`, `20:701` |

## Missing originals and properties requiring follow-up

All identified visible visual slots have usable prepared files, but **10 source image hashes could not be recovered as exact original bytes**. The broad original-image export was capped at 20 entries and included thumbnail/hidden-fill sources; subsequent targeted original-source calls hit the connected Starter plan’s MCP tool-call limit. `whoami` confirmed the Starter tier. Existing design-context URLs were still downloadable and supplied the prepared alternatives listed above. A manual original-source export, or a later targeted MCP call after access is available, is needed for the following sources:

| Exact source hash | Representative exact frame/layers | Available local alternative |
| --- | --- | --- |
| `2b7e3dbe87fd56c905028155dc58b8c635b78115` | Homepage / Antique%20Bronze%20Statue%20of%20Justice.H02.2k (`20:16`); Homepage Mobile / Antique%20Bronze%20Statue%20of%20Justice.H02.2k (`20:587`) | hero-lady-justice-export.png |
| `5a0bc430f68e1c48cb346d845c410a965abc636b` | Homepage / image (`20:165`); Navigation Menu / image (`20:425`) | news-lawyers-students-export.png |
| `76ad5181e39d0fec304affc37974cd920ebc73db` | Homepage / Rectangle 6 (`20:125`); Homepage Mobile / Rectangle 36 (`20:655`) | road-to-2027-legal-meeting-export.png |
| `779d0b8ac5f1b68f9928bf6cc9249bb66dfd294e` | Homepage / Ripped Paper 11 (`20:43`); Homepage Mobile / Ripped Paper 11 (`20:600`) | hero-paper-edge-*.png and section-paper-edge.png |
| `790c1d2d91c29957b6a954b71729f949c67e0ffb` | Navigation Menu / vintage-themis-scales-isolated-on-black-2024-11-18-23-35-14-utc 1 (`20:506`); Nav mobile / vintage-themis-scales-isolated-on-black-2024-11-18-23-35-14-utc 2 (`20:825`) | navigation-scales-export.png (prepared combined fill) |
| `83b84525409cc68f0549fbc7900b73178bbd6a60` | Navigation Menu / vintage-themis-scales-isolated-on-black-2024-11-18-23-35-14-utc 1 (`20:506`); Nav mobile / vintage-themis-scales-isolated-on-black-2024-11-18-23-35-14-utc 2 (`20:825`) | navigation-scales-export.png (prepared combined fill) |
| `ae823aecdf8c6771d431c98b365c02b659bb7564` | Homepage / Ripped Paper 03 (`20:46`); Homepage Mobile / Ripped Paper 03 (`20:603`) | hero-paper-angle-*.png and anniversary-paper-edge-*.png |
| `c747a9b4f64d12d076f3e41564e8a881f5d7d71a` | Homepage / Rectangle 34 (`20:195`); Homepage Mobile / Rectangle 37 (`20:728`) | career-office-background-export.png |
| `f53349780a0fd4de91443087679f8b6a94a1ea86` | Homepage / 0023 (`20:3`); Homepage Mobile / 0023 (`20:548`) | paper-texture-light-export.png and desktop/mobile prepared variants |
| `fa3ef55cc1a95c4d39788484a0f87327baea1888` | Homepage / Rectangle 11 (`20:75`); Homepage Mobile / Rectangle 11 (`20:568`) | service-specialists-directory-export.png |

Other unresolved design details:

- The original Lexora logo (`20:27`, `20:229`, `20:581`, `20:761`) is raster. No genuine vector logo was exposed. Preserve that PNG; an SVG logo would require a separate supplied vector original.
- Navigation underlay logo layers `20:488` and `20:785` contain **The Law Society of Singapore**, whereas the homepage layers contain **Lexora Law Partners**. Both originals were preserved with explicit filenames. The overlay hides those legacy logo layers in the shown state; confirm the intended brand before implementing additional states.
- Desktop Hunan press card says “Media | May 2025” (`20:179`); mobile says “Media | April 2025” (`20:720`). Desktop says “Specialists Directory”; mobile says “Specialist Directory”. Text retains several LawSoc references and placeholder copy. These were documented, not rewritten.
- No video media file or destination was supplied for the anniversary Play video control (`20:68–71`, mobile `20:640–643`). The photo and play artwork are saved; actual video content requires a supplied source.
- Font names/weights were readable, but font binaries and exact browser font metrics were not supplied. Obtain the intended Montserrat/Oswald font files through an appropriate font source later; this phase installs nothing.
- Only desktop and mobile endpoints are provided. No tablet frame, exact breakpoint values, mobile submenu state, expanded legal-support state, year-specific 2026/2027 content, carousel behavior, or interaction timing was established. The selected/hover-like Pro Bono state is visible only on desktop.
- Original source cropping transforms were readable, but a complete reusable image-adjustment specification and prototype-reaction inventory could not be queried after the MCP call limit. Prepared exports preserve the available visual treatments. Do not assume original colored photos alone reproduce the reference.
- Hidden alternative statue/photo fills and obsolete layout/icon layers were inspected but not all copied into public assets; only selected design assets and source-fill counterparts were retained. Whole-frame screenshots were used for inspection only.

## Validation and repository scope

- Every saved raster decoded and passed Pillow image verification as PNG or JPEG. The phone-screen download had a misleading `.png` URL but is actual JPEG; it was saved correctly as `career-phone-screen.jpg`.
- Every SVG parsed as an SVG XML document with a viewBox; no scripts or external image references were found. The dedicated mobile mask embeds its image as a data URL.
- All saved files are non-empty; none contains an HTML error response. File sizes and image dimensions appear in the tables above.
- SHA-256 deduplication found no identical saved files. Thumbnails, hidden unused originals, duplicate API downloads, and whole-frame renders stayed outside the repository.
- Raster contact sheets and a headless-Chrome SVG contact sheet were visually inspected. Original colors versus prepared monochrome/crop variants were checked.
- `git diff --exit-code` confirms existing tracked project files are unchanged. Only `DESIGN_NOTES.md` and `public/assets/` were added. No dependency installation, application implementation, commit, or push was performed.
- Lint/build were not rerun because application code, configuration and dependencies were unchanged; this phase validates asset files and repository scope.

Acceptance: all four frames/nested-layer inventories, ordered section inventory, asset identification, available local downloads/validation, missing-source documentation, and unchanged application setup are complete. Exact original-source recovery remains partial as described above.
