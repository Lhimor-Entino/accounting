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

    return {
        createdToast
    }
}

export default useCustomToast