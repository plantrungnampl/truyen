// "use client";

// import { motion } from "framer-motion";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { LucideIcon } from "lucide-react";
// export const itemVariants = {
//   hidden: { opacity: 0, x: -50 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { type: "spring", stiffness: 100 },
//   },
// };

// interface InputFieldProps {
//   id: string;
//   type: string;
//   placeholder: string;
//   value: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   icon: LucideIcon;
// }
// const AnimatedInput = motion(Input);

// const InputField = ({
//   id,
//   type,
//   placeholder,
//   value,
//   onChange,
//   icon: Icon,
// }: InputFieldProps) => (
//   <motion.div variants={itemVariants}>
//     <div className="space-y-2">
//       <Label htmlFor={id} className="text-sm font-medium text-gray-700">
//         {placeholder}
//       </Label>
//       <div className="relative">
//         <AnimatedInput
//           id={id}
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           className="pl-10"
//           required
//           whileFocus={{ scale: 1.02 }}
//           transition={{ type: "spring", stiffness: 300, damping: 10 }}
//         />
//         <Icon
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//           size={18}
//         />
//       </div>
//     </div>
//   </motion.div>
// );
// export default InputField;
"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AnimatedInput = motion(Input);

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ElementType;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {placeholder}
      </Label>
      <div className="relative">
        <AnimatedInput
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10"
          required
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
        <Icon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>
    </div>
  </motion.div>
);
