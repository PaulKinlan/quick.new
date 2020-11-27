# Test Docker file 
docker build --tag quick-new:1.0 .

# Need to ensure cloud build is enabled.
gcloud builds submit --tag gcr.io/quick-new/web-server --project=quick-new
gcloud run deploy --image gcr.io/quick-new/web-server --project=quick-new --platform managed