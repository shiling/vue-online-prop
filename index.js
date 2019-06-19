let installed = false

const VueOnline = {}

// We only need one instance of the connectivity checker
VueOnline.instance = new Vue({
	data: function() {
		return {
			status: false //  the status has to be a reactive property
		}
	}
})

// 
function updateOnlineStatus() {
	VueOnline.instance.status = navigator.onLine
}
updateOnlineStatus() // call immediately

/**
 * Install AmIOnline
 */
VueOnline.install = function(Vue) {
	if (!installed) {
		// can get $online, but don't let components set $online
		Object.defineProperty(Vue.prototype, "$online", {
			get: function get() {
				return VueOnline.instance.status
			}
		})

		window.addEventListener("online", updateOnlineStatus)
		window.addEventListener("offline", updateOnlineStatus)
	}
	installed = true
}

if (typeof window !== "undefined" && window.Vue) {
	window.Vue.use(VueOnline)
}

export default VueOnline
