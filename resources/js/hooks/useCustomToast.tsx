import { getDateTime } from "@/utils/dateUtils"
import { useToast } from "./use-toast"

const useCustomToast= () => {
    const { toast } = useToast()
    const createdToast = (title:string) => {
        return toast({
            title: title,
            description: getDateTime(),
          })
    }
    const deactivateToast = (title:string) => {
        return toast({
            title: title,
            description: getDateTime(),
            className:" bg-red-400 text-white",
            duration: 2000
          })
    }

    return {
        createdToast,
        deactivateToast
    }
}

export default useCustomToast