import {
	ref
} from 'vue'
import {
	getConfigKey
} from "@/api/system";

export function useGetConfigKey(configKey) {
	const configValue = ref('')

	const getConfigKeyFunc = () => {
		return getConfigKey(configKey).then(res => {
			configValue.value = res.msg
		}).catch(error => {
			console.log(error)
			configValue.value = ''
		})
	}

	return {
		configValue,
		getConfigKeyFunc
	}
}