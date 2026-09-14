# Dashboard Screenshots

Both images are genuine browser captures from the deployed Grafana instance, not redrawn charts or screenshots of mock dashboards. They use a light theme and a relative last-seven-days window.

## Admin Dashboard

- Asset: `dashboard-admin.png`.
- Dashboard: Admin / FTS3 Transfer Monitoring, UID `aei92iii0cf7kc`.
- Source: https://dci-grafana.ihep.ac.cn/d/aei92iii0cf7kc/fts3-transfer-monitoring
- Selection: upper overview statistics and the throughput panel; native filters remain visible.
- Filters: VO `juno`, bin `1h`, `vo_sub_type = juno-raw` through the actual generic Filters control. The tag was verified in a real Grafana data-query request.
- The screenshot demonstrates a workload selection, not all-JUNO yearly totals. The displayed period and filters differ from slide 5.

## Shift Dashboard

- Asset: `dashboard-shift.png`.
- Dashboard: User / Shift Dashboard, UID `fe7g4xmfyby80c`.
- Source: https://dci-grafana.ihep.ac.cn/d/fe7g4xmfyby80c/shift-dashboard
- Selection: the FTS panels within Raw Data Transfer: throughput, efficiency, active transfers, connections by link, and the per-link volume view. Other sections are outside the crop.
- Host load, filesystem usage and disk I/O are provided by the same dashboard's Server Resource Summary, not by the cropped Raw Data Transfer panels. The slide makes this distinction explicit.

## Capture Boundaries

The capture used browser UI navigation, closed the sidebar locally, and cropped complete selected panels. It did not rewrite panel queries, replace returned data, rearrange panels, or save dashboard changes. Address labels are masked for publication; numeric metric values are unchanged. Native panel names are preserved even where a legacy title is imprecise.
