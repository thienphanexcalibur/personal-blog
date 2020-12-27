---
layout: Post
title: Faster pasting in terminal with zsh-auto-suggestions turned on
content: Slow pasting in your zsh terminal with zsh-auto-suggestions?
thumbnail: /img/zsh.jpg
pageClass: post
sidebar: false
id: 74811
---
```mkdir $ZSH_CUSTOM/lib/```

```cp $ZSH/lib/misc.zsh $ZSH_CUSTOM/lib/.```

```vi $ZSH_CUSTOM/lib/misc.zsh```

```#if [[ $ZSH_VERSION != 5.1.1 ]]; then
#  for d in $fpath; do
#       if [[ -e "$d/url-quote-magic" ]]; then
#               if is-at-least 5.1; then
#                       autoload -Uz bracketed-paste-magic
#                       zle -N bracketed-paste bracketed-paste-magic
#               fi
#               autoload -Uz url-quote-magic
#               zle -N self-insert url-quote-magic
#      break
#       fi
#  done
#fi```

Source: https://apple.stackexchange.com/questions/312795/zsh-paste-from-the-clipboard-a-command-takes-a-few-second-to-be-write-in-the-ter
