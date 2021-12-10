#!/bin/bash
# In the name of Allah

if [ ! -x "$(command -v lessc)" ]; then
    echo -e "\e[31mError: 'Less' installation is essential!\e[21m\e[0m"
    echo "see here: https://lesscss.org/usage/"
    exit
fi

cu_dir=$(dirname "$0")
cu_input=$cu_dir/../less/forum.less
cu_output=$cu_dir/../dist/forum.css

askYN() {
    while true; do
        read -t 5 -p "$@ [y/n] " yn
        case $yn in
            [Yy]* )
                return 1
            ;;
        esac
        return 0
    done
}

if [ ! -f "$cu_input" ]; then
  echo -e "\e[31mError: We could not find the input '.less' file.\e[21m\e[0m"
  echo entry: $cu_input
  exit 1
fi

echo -e "start with -> \e[1m$(lessc -v)\e[0m"

if [ -f "$cu_output" ]; then
  askYN "Hey: The output file is now there! Do you want to rewrite it?"
  ret=$?

  if [ $ret -eq 1 ]; then
    lessc $cu_input $cu_output
    echo "it's ok! your file is ready in '$cu_output'."
  else
    echo "canceled."
    exit 1
  fi

fi

exit 0
