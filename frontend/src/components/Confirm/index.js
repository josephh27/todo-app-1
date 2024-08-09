import Swal from "sweetalert2";
import './style.scss';

const Confirm = async(tasks, setTasks, index, type) => {
    if (type === 'deleteSingle') {
        const Toast = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
    
        if (Toast.isConfirmed) {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
    
            Swal.fire({
                title: "Deleted!",
                text: "The task has been deleted.",
                icon: "success"
            });
        }
    } else if (type === 'deleteAll') {
        const Toast = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
    
        if (Toast.isConfirmed) {
            setTasks([])
            Swal.fire({
                title: "Deleted!",
                text: "All tasks have been deleted.",
                icon: "success"
            });
        }
    }
}


  
export default Confirm;