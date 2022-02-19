<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use App\Traits\HasUserFieldsTrait;

class TraditionalRegisterRequest extends FormRequest
{   


    use HasUserFieldsTrait;

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
            $this->email(),
            $this->alias(),
            $this->name(),
            $this->password(),
            $this->passwordConfirmation(),
            $this->dateOfBirth()
        );
    }
}
