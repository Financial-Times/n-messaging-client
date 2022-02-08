node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

demo-certs:
	cd demos && $(SHELL) make-certs.sh
	@$(DONE)

demo-js:
	webpack --config demos/webpack.config.js
	@$(DONE)

demo-css:
	node-sass --include-path=node_modules --output demos/public demos/src/demo.scss
	@$(DONE)

demo-build: demo-js demo-css
	@$(DONE)

demo-watch: demo-css # demo-css because node-sass doesn't build one at start of watch
	webpack --watch --config demos/webpack.config.js &
	node-sass --watch --include-path=node_modules --output demos/public demos/src/demo.scss &
	nodemon --ext js,css,html --watch demos/ --watch server/ demos/start.js

demo-run:
	node demos/start

# note that you could also use the proxy controller
demo-with-guru: demo-build
	GURU_HOST=http://local.ft.com:3002 node demos/start

test: verify
	mocha --recursive
