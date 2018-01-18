node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

link-templates:
	@echo "Creating symlink to mimic bower_component setup /templates -> public/n-messaging-client"
	mkdir -p "$(CURDIR)/public/n-messaging-client"
	ln -sf "$(CURDIR)/templates" "$(CURDIR)/public/n-messaging-client/"

demo-build: link-templates
	webpack --config demos/webpack.config.js
	@$(DONE)

demo: demo-build
	@DEMO_MODE=true node demos/app

run:
	@DEMO_MODE=true node demos/app

demo-with-guru: demo-build
	@GURU_HOST=http://local.ft.com:3002 DEMO_MODE=true node demos/app

a11y: demo-build
	@PA11Y=true DEMO_MODE=true node demos/app
	@$(DONE)

test: verify
	make smoke

unit-test:
	make smoke

smoke:
	export TEST_URL=http://localhost:5005; \
	make a11y
