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
            className:"  text-white",
            duration: 2000
          })
    }

    const warningToast = (title:string,description:string) => {
        return toast({
            title: title,
            description: description,
            className:"bg-amber-400 text-black",
            duration: 2000
          })
    }
    return {
        createdToast,
        deactivateToast,
        warningToast
    }
}

export default useCustomToast