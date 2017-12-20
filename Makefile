node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

demo-build:
	webpack --config demos/webpack.config.js
	@$(DONE)

demo: demo-build
	@DEMO_MODE=true node demos/app

a11y: demo-build
	@PA11Y=true DEMO_MODE=true node demos/app
	@$(DONE)

test: verify

smoke:
	export TEST_URL=http://localhost:5005; \
	make a11y
