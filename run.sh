#!/usr/bin/env bash
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "\e[31m❌ ${1}"
  # reset colours back to normal
  printf "\033\e"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green
  printf "\e[32m✅ ${1}"
  # reset colours back to normal
  printf "\033\e"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [[ $1 == 1 ]]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

function installImagemagick {

if [[ $(program_is_installed convert) ]]; then
            echo_pass 'imagemagick already have'
    else
        if [[ $(program_is_installed brew) ]]; then
            brew install imagemagick
        else
            if [[ $(program_is_installed apt-get) ]]; then
                apt-get install imagemagick
            else
                echo_fail '️You must install imagemagick manually \nhttps://imagemagick.org/script/download.php \nInstall and run again. ✨'
                exit 1
             fi;
        fi;
    fi;

}
function runBackend {
    cd backend

    installImagemagick

    if [[ $(program_is_installed yarn) ]]; then
        yarn install
        yarn start
    else
        npm i
        npm run start
    fi
}

function runFrontEnd {
    cd front-end/
    if [[ $(program_is_installed yarn) ]]; then
        yarn install
        yarn serve
    else
        npm i
        npm run serve
    fi
}

runBackend & runFrontEnd;
