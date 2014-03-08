require 'sinatra'
require 'erb'

get '/' do
  @quote = "testing error"
  erb :index
end