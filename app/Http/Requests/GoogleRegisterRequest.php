<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use App\Traits\HasUserFieldsTrait;

class GoogleRegisterRequest extends FormRequest
{

    use HasUserFieldsTrait;

    protected $redirectRoute = "request-alias";

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return array_merge(
            $this->googleID(),
            $this->email(),
            $this->alias(),
            $this->name(),
            $this->picture(),
        );
    }
}
