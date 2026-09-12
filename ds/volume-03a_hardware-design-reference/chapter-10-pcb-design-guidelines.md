# Chapter 10: PCB Design Guidelines

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 10.1 Layer Stack-Up

- 2-layer for ultra-low-power simple modules; 4+ layers for RF/compute.
- Dedicate ground plane adjacent to signal layers.
- Keep RF layers over solid ground.

## 10.2 High-Speed Routing

- Route USB/SPI per impedance and length rules.
- Keep differential pairs matched.
- Minimize vias on high-speed signals.

## 10.3 Ground Planes

- Unbroken ground under RF and high-speed areas.
- Stitch grounds around the board.
- Return paths must not be cut by slots.

## 10.4 Power Integrity

- Low-impedance power distribution.
- Bulk + ceramic decoupling near loads.
- Separate analog and digital power domains where needed.

## 10.5 Signal Integrity

- Terminate fast edges.
- Keep sensitive signals away from switching nodes.
- Follow sensor conditioning guidance (Chapter 6).

## 10.6 RF Routing

- Controlled impedance for antenna traces.
- Keep RF traces short and shielded.
- Maintain antenna keep-out zones.

## 10.7 Decoupling

- Place decoupling capacitors close to each IC pin.
- Use vendor-recommended values and types.
- Add ferrite beads for noise isolation.

## 10.8 Thermal Vias

- Add vias under hot ICs to spread heat (Chapter 12).
- Connect to internal/external copper areas.

## 10.9 Connector Placement

- Position the 18-pin connector (Volume III, Ch 3) for clean mechanical mating.
- Route power pins with adequate width; signal pins per spec.
- Add ESD protection at the connector.

## 10.10 EMI Reduction

- Use shielding cans around radios/switching regulators.
- Snubbers on switching nodes.
- Filtering on external connections.

## 10.11 Manufacturing Tolerances

- Follow fab capabilities (min trace/space, via size).
- Panelization-friendly design (Chapter 16).
- Add fiducials and tooling holes.

## 10.12 Example Layouts

- Provide example layouts for common module sizes (ring, bead, hub).
- Demonstrate connector, antenna, battery, and sensor placement.

## 10.13 Summary

Disciplined stack-up, routing, decoupling, and RF layout produce reliable, certifiable modules.
