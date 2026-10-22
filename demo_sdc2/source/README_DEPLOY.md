# Deploying this demo

The parent folder (`demo_sdc2/`) is the built site served at https://0xmyth.com/demo_sdc2/.

To update it:

```bash
npm install
npm run build:pages          # builds with base /demo_sdc2/
# copy dist/ over demo_sdc2/ (keep this source/ folder), then re-create the
# route fallbacks so refreshing a deep link works without a site-wide 404.html:
for r in dashboard start methodology design roles/data_analyst roles/financial_analyst \
         roles/mechanical_design_engineer roles/sustainability_coordinator; do
  mkdir -p ../$r && cp ../index.html ../$r/index.html
done
```
