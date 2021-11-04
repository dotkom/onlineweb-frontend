
docker build -t onlineweb-frontend  \
--build-arg OW4_HOST="$(vault kv get -field=ow4_host secret/owf/env)" \
--build-arg OW4_SCHEME="https" \
--build-arg OW4_SSO_CLIENT_ID="$(vault kv get -field=ow4_sso_client_id secret/owf/env)" \
--build-arg OW4_SSO_CALLBACK="$(vault kv get -field=ow4_sso_callback secret/owf/env)" \
--build-arg OWF_SENTRY_DSN="$(vault kv get -field=owf_sentry_dsn secret/owf/env)" \
--build-arg OWF_GOOGLE_ANALYTICS_KEY="$(vault kv get -field=owf_google_analytics_key secret/owf/env)" \
--build-arg OWF_VAPID_SERVER_KEY="$(vault kv get -field=owf_vapid_server_key secret/owf/env)" \
--build-arg STRIPE_PUBLIC_KEY_ARRKOM="$(vault kv get -field=stripe_public_key_arrkom secret/owf/env)" \
--build-arg STRIPE_PUBLIC_KEY_FAGKOM="$(vault kv get -field=stripe_public_key_fagkom secret/owf/env)" \
--build-arg STRIPE_PUBLIC_KEY_PROKOM="$(vault kv get -field=stripe_public_key_prokom secret/owf/env)" \
--build-arg STRIPE_PUBLIC_KEY_TRIKOM="$(vault kv get -field=stripe_public_key_trikom secret/owf/env)" \
--build-arg RECAPTCHA_PUBLIC_KEY="$(vault kv get -field=recaptcha_public_key secret/owf/env)" \
.


