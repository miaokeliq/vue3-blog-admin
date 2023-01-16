import { ElMessage } from "element-plus";

const message = {
  error: (msg) => {
    ElMessage({
      message: msg,
      type: "error",
      duration: 2000,
    });
  },
  success: (msg) => {
    ElMessage({
      message: error,
      type: "success",
      duration: 2000,
    });
  },
  warning: (msg) => {
    ElMessage({
      message: error,
      type: "warning",
      duration: 2000,
    });
  },
};

export default message;
