let installed = false

const VueOnline = {}

function updateOnlineStatus() {
	if (VueOnline && VueOnline.instance) {
		VueOnline.instance.status = navigator.onLine
	}
}

/**
 * Install AmIOnline
 */
VueOnline.install = function(Vue) {
	if (!installed) {

		// We only need one instance of the connectivity checker
		VueOnline.instance = new Vue({
			data: function() {
				return {
					status: navigator.onLine //  the status has to be a reactive property
				}
			}
		})

		// can get $online, but don't let components set $online
		Object.defineProperty(Vue.prototype, "$online", {
			get: function get() {
				return VueOnline.instance.status
			}
		})

		// listen to "online" and "offline" events
		window.addEventListener("online", updateOnlineStatus)
		window.addEventListener("offline", updateOnlineStatus)

	}
	installed = true
}

if (typeof window !== "undefined" && window.Vue) {
	window.Vue.use(VueOnline)
}

export default VueOnline
