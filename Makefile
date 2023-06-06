node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

demo-certs:
	cd demos && $(SHELL) make-certs.sh
	@$(DONE)

demo-js:
	NODE_OPTIONS="--openssl-legacy-provider" webpack --config demos/NODE_OPTIONS="--openssl-legacy-provider" webpack.config.js
	@$(DONE)

demo-css:
	sass --load-path=node_modules demos/src/demo.scss:demos/public/demo.css
	@$(DONE)

demo-build: demo-js demo-css
	@$(DONE)

demo-watch: demo-certs demo-css # demo-css because node-sass doesn't build one at start of watch
	NODE_OPTIONS="--openssl-legacy-provider" webpack --watch --config demos/NODE_OPTIONS="--openssl-legacy-provider" webpack.config.js &
	sass --watch --load-path=node_modules demos/src/demo.scss:demos/public/demo.css &
	nodemon --ext js,css,html --watch demos/ --watch server/ demos/start.js

demo-run: demo-certs
	node demos/start

# note that you could also use the proxy controller
demo-with-guru: demo-build
	GURU_HOST=http://local.ft.com:3002 node demos/start

test: verify
	mocha --recursive
