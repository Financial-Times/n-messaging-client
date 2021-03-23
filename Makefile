node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

demo-certs:
	cd demos && $(SHELL) make-certs.sh
	@$(DONE)

demo-build:
	webpack --config demos/webpack.config.js
	@$(DONE)

demo-watch:
	webpack --watch --config demos/webpack.config.js &
	nodemon --ext js,css,html --watch demos/ --watch server/ demos/start.js

demo-run:
	node demos/start

# note that you could also use the proxy controller
demo-with-guru: demo-build
	GURU_HOST=http://local.ft.com:3002 node demos/start

test: verify
	mocha --recursive
