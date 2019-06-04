# Simple ToDo App in Node.js

## Usage

### Display tasks list

`node app -list`
or:
`node app -l`
or just:
`node app`

### Add task

`node app -a "task content"`
or:
`node app --add="task content"`

You can also mark task as important by adding `-i` or `--important` at the end:
`node app -a "important task content" -i`

### Remove task

`node app -r "task content"`
or:
`node app --remove="task content"`
