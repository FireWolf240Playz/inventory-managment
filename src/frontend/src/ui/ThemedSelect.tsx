import Select, { Props as SelectProps } from "react-select";

export function ThemedSelect<T>(props: SelectProps<T>) {
  const isDarkMode = document.documentElement.classList.contains("dark-mode");
  function getSelectStyles(isDark: boolean) {
    return {
      control: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? "#18212f" : "#fff",
        borderColor: isDark ? "#555" : "#ccc",
        color: isDark ? "#fff" : "#000",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: isDark ? "#fff" : "#000",
      }),
      menu: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? "#18212f" : "#fff",
      }),
      option: (provided: any, state: any) => {
        const { isFocused, isSelected } = state;
        let backgroundColor = isDark ? "#18212f" : "#fff";
        const color = isDark ? "#fff" : "#000";

        if (isFocused) backgroundColor = isDark ? "#2a3444" : "#eee";
        if (isSelected) backgroundColor = isDark ? "#2a3444" : "#ddd";

        return {
          ...provided,
          backgroundColor,
          color,
        };
      },
    };
  }

  const mergedStyles = {
    ...props.styles,
    ...getSelectStyles(isDarkMode),
  };

  return <Select {...props} styles={mergedStyles} />;
}
